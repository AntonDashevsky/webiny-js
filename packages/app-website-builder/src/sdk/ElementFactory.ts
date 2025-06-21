import { generateAlphaNumericLowerCaseId } from "@webiny/utils/generateId";
import type { DocumentElement, ComponentManifest } from "~/sdk/types";
import {
    ComponentManifestToAstConverter,
    type InputAstNode
} from "./ComponentManifestToAstConverter";
import { ComponentInputTraverser } from "./ComponentInputTraverser";

export type AddElementOp = {
    type: "add-element";
    element: DocumentElement;
};

export type AddToParentOp = {
    type: "add-to-parent";
    elementId: string;
    parentId: string;
    slot: string;
    index: number;
};

export type SetStaticOp = {
    type: "set-static";
    elementId: string;
    scope: "inputs" | "styles";
    binding: string; // e.g. "columns[0].children"
    value: any;
    meta: {
        type: string;
        dataType: string;
        list?: boolean;
    };
};

export type RemoveElementOp = {
    type: "remove-element";
    elementId: string;
};

export type Operation = AddElementOp | AddToParentOp | SetStaticOp | RemoveElementOp;

interface GenerateOperationsParams {
    componentName: string;
    parentId: string;
    slot: string;
    index: number;
    defaults?: {
        inputs?: Record<string, any>;
        styles?: Record<string, any>;
    };
}

export class ElementFactory {
    constructor(private components: Record<string, ComponentManifest>) {}

    public generateOperations({
        componentName,
        parentId,
        slot,
        index,
        defaults
    }: GenerateOperationsParams): Operation[] {
        const manifest = this.components[componentName];
        if (!manifest) {
            throw new Error(`Component "${componentName}" not registered.`);
        }

        const elementId = generateAlphaNumericLowerCaseId();
        const element: DocumentElement = {
            type: "Webiny/Element",
            id: elementId,
            parent: { id: parentId, slot },
            component: { name: componentName }
        };

        const ops: Operation[] = [
            { type: "add-element", element },
            {
                type: "add-to-parent",
                elementId,
                parentId,
                slot,
                index
            }
        ];

        const ast: InputAstNode[] = ComponentManifestToAstConverter.convert(manifest.inputs || []);
        const inputData = defaults?.inputs ?? manifest.defaults?.inputs ?? {};
        const traverser = new ComponentInputTraverser(ast);

        traverser.traverse(inputData, (node, path, value) => {
            const isCreateElement = value?.action === "CreateElement";
            const isList = node.list;
            const isObject = node.type === "object";

            if (isCreateElement) {
                const childOps = this.generateOperations({
                    componentName: value.params.component,
                    parentId: elementId,
                    slot: path,
                    index: isList ? this.extractIndex(path) : -1,
                    defaults: value.params
                });

                ops.push(...childOps);

                const created = childOps.find(op => op.type === "add-element") as AddElementOp;
                const valueToSet = node.list ? [created.element.id] : created.element.id;

                ops.push({
                    type: "set-static",
                    elementId,
                    scope: "inputs",
                    binding: path,
                    value: valueToSet,
                    meta: {
                        type: node.type,
                        dataType: node.dataType,
                        list: node.list
                    }
                });
            } else if (isObject && isList) {
                return;
            } else {
                ops.push({
                    type: "set-static",
                    elementId,
                    scope: "inputs",
                    binding: path,
                    value: value ?? null,
                    meta: {
                        type: node.type,
                        dataType: node.dataType,
                        list: node.list
                    }
                });
            }
        });

        // Process styles
        if (defaults?.styles) {
            for (const device in defaults.styles) {
                const styleValues = defaults.styles[device];
                for (const key in styleValues) {
                    ops.push({
                        type: "set-static",
                        elementId,
                        scope: "styles",
                        binding: `${device}.${key}`,
                        value: styleValues[key],
                        meta: {
                            type: "style",
                            dataType: typeof styleValues[key]
                        }
                    });
                }
            }
        }

        return ops;
    }

    private extractIndex(path: string): number {
        const match = path.match(/\[(\d+)\]/);
        return match ? parseInt(match[1], 10) : 0;
    }
}
