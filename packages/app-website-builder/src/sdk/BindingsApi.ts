import set from "lodash/set";
import type { ElementFactory } from "~/sdk/ElementFactory";
import type { InputAstNode } from "./ComponentManifestToAstConverter";
import type { DocumentElementBindings } from "~/sdk/types";
import type { IDocumentOperation } from "./documentOperations/IDocumentOperation";
import { createElement, type CreateElementParams } from "./createElement";
import { DocumentOperations } from "~/sdk/documentOperations";

type FlatBindings = Record<string, Record<string, any>>;
type DeepBindings = Record<string, any>;

export class BindingsApi {
    public inputs: DeepBindings = {};
    public styles: DeepBindings = {};
    private readonly elementId: string;
    private readonly inputsAst: InputAstNode[];
    private elementFactory: ElementFactory;
    private breakpoint: string;
    private operations: IDocumentOperation[] = [];
    private elementReferences: Set<string>;
    private originalBindings: DocumentElementBindings;

    constructor(
        elementId: string,
        bindings: DocumentElementBindings,
        inputsAst: InputAstNode[],
        elementFactory: ElementFactory,
        breakpoint: string
    ) {
        this.breakpoint = breakpoint;
        this.elementId = elementId;
        this.inputsAst = inputsAst;
        this.elementFactory = elementFactory;
        this.originalBindings = bindings;
        this.inputs = this.toDeep(bindings.inputs || {}, this.inputsAst);
        this.styles = this.toDeepStyles(bindings.styles || {});
        this.elementReferences = this.getElementReferences(bindings.inputs);
    }

    public getOperations(): IDocumentOperation[] {
        return this.operations;
    }

    public getPublicApi() {
        if (!this.styles[this.breakpoint]) {
            this.styles[this.breakpoint] = {};
        }

        return {
            inputs: this.inputs,
            styles: this.styles,
            createElement: (params: CreateElementParams) => {
                return createElement(params);
            }
        };
    }

    public toFlatBindings(): FlatBindings {
        const originalInputs = this.originalBindings.inputs ?? {};
        const rebuilt: FlatBindings = { inputs: {}, styles: {} };
        const seenPaths = new Set<string>();

        /**
         * Extracts a deeply nested value from an object using a flat key path like "rows[0].columns[1].children".
         */
        const getValue = (obj: any, path: string): any => {
            const keys = path
                .split(/\.|\[(\d+)\]/)
                .filter(Boolean)
                .map(k => (/\d+/.test(k) ? +k : k));
            return keys.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
        };

        /**
         * Traverses the AST and compares current (deep) input values against the original bindings.
         * For each path:
         * - If changed, adds it to the rebuilt bindings.
         * - If a CreateElement action is detected, generates child operations.
         * - If unchanged, reuses the original binding entry (preserving metadata like expressions).
         * - Skips deleted values (i.e., not present in the new state).
         */
        const compareAndCollect = (nodes: InputAstNode[], prefix: string[]) => {
            for (const node of nodes) {
                const pathParts = [...prefix, node.name];
                const flatKey = pathParts.join(".");
                seenPaths.add(flatKey);

                if (node.children.length) {
                    if (node.list) {
                        const list = getValue(this.inputs, flatKey);
                        if (Array.isArray(list)) {
                            for (let i = 0; i < list.length; i++) {
                                compareAndCollect(node.children, [
                                    ...pathParts.slice(0, -1),
                                    `${node.name}[${i}]`
                                ]);
                            }
                        }
                    } else {
                        compareAndCollect(node.children, pathParts);
                    }
                } else {
                    const newValue = getValue(this.inputs, flatKey);
                    const originalEntry = originalInputs[flatKey];
                    const originalValue = originalEntry?.static;

                    if (newValue === undefined) {
                        continue;
                    }

                    if (typeof newValue === "object" && newValue.action === "CreateElement") {
                        const newElement = this.elementFactory.createElementFromComponent({
                            componentName: newValue.params.component,
                            parentId: this.elementId,
                            slot: flatKey,
                            index: -1,
                            bindings: newValue.params
                        });

                        const createdId = newElement.element.id;
                        rebuilt.inputs[flatKey] = {
                            static: node.list ? [createdId] : createdId,
                            type: node.type,
                            dataType: node.dataType,
                            list: node.list
                        };
                        this.operations.push(...newElement.operations);
                    } else if (newValue !== originalValue) {
                        rebuilt.inputs[flatKey] = {
                            ...(originalEntry ?? {}),
                            static: newValue,
                            type: node.type,
                            dataType: node.dataType,
                            list: node.list
                        };
                    } else if (newValue === originalValue) {
                        rebuilt.inputs[flatKey] = originalEntry;
                    }
                }
            }
        };

        compareAndCollect(this.inputsAst, []);

        /**
         * Identifies slot elements that were previously referenced but are no longer used,
         * and schedules them for removal.
         */
        const usedSlotIds = this.getElementReferences(rebuilt.inputs);
        for (const id of this.elementReferences) {
            if (!usedSlotIds.has(id)) {
                this.operations.push(new DocumentOperations.RemoveElement(id));
            }
        }

        rebuilt.styles = this.flattenStyles(this.styles);
        return rebuilt;
    }

    private toDeep(flat: FlatBindings, ast: InputAstNode[]): DeepBindings {
        const result: DeepBindings = {};

        const assignValue = (path: (string | number)[], value: any) => {
            let current = result;
            for (let i = 0; i < path.length - 1; i++) {
                const key = path[i];
                const nextKey = path[i + 1];
                const isNextIndex = typeof nextKey === "number";

                if (typeof key === "number") {
                    if (!Array.isArray(current)) {
                        throw new Error("Expected array in path assignment.");
                    }
                    while (current.length <= key) {
                        current.push(isNextIndex ? [] : {});
                    }
                    if (typeof current[key] !== "object") {
                        current[key] = isNextIndex ? [] : {};
                    }
                    current = current[key];
                } else {
                    if (!(key in current) || typeof current[key] !== "object") {
                        current[key] = isNextIndex ? [] : {};
                    }
                    current = current[key];
                }
            }
            current[path[path.length - 1]] = value;
        };

        const walk = (nodes: InputAstNode[], prefix: string[]) => {
            for (const node of nodes) {
                const pathParts = [...prefix, node.name];
                const flatKey = pathParts.join(".");
                const entry = flat[flatKey];
                const staticValue = entry?.static;

                if (node.children.length > 0) {
                    if (node.list) {
                        const pattern = new RegExp(
                            `^${flatKey
                                .replace(/\./g, "\\.")
                                .replace(/\[/, "\\[")
                                .replace(/\]/, "\\]")}\\[(\\d+)\\]`
                        );
                        const indexes = Object.keys(flat).reduce((acc: number[], key) => {
                            const match = key.match(pattern);
                            if (match) {
                                acc.push(parseInt(match[1], 10));
                            }
                            return acc;
                        }, []);

                        const uniqueIndexes = Array.from(new Set(indexes)).sort((a, b) => a - b);

                        for (const i of uniqueIndexes) {
                            walk(node.children, [...prefix, `${node.name}[${i}]`]);
                        }
                    } else {
                        walk(node.children, pathParts);
                    }
                } else if (staticValue !== undefined) {
                    const path = pathParts.reduce<(string | number)[]>((acc, part) => {
                        const match = part.match(/(.*?)\[(\d+)\]/);
                        if (match) {
                            acc.push(match[1], Number(match[2]));
                        } else {
                            acc.push(part);
                        }
                        return acc;
                    }, []);
                    assignValue(path, staticValue);
                }
            }
        };

        walk(ast, []);
        return result;
    }

    /**
     * Convert the styles object back to the original structure with ValueBinding value object.
     */
    private flattenStyles(styles: DeepBindings) {
        const result: DocumentElementBindings["styles"] = {};

        // Assign new values.
        Object.keys(styles).forEach(screenSize => {
            Object.keys(styles[screenSize]).forEach(key => {
                set(result, `${screenSize}.${key}.static`, styles[screenSize][key]);
            });
        });

        return result;
    }

    /**
     * This method removes the `static` key from the value, since the `onChange` callback
     * is only executed on static values.
     */
    private toDeepStyles(styles: DocumentElementBindings["styles"] = {}) {
        const result: DeepBindings = {};
        Object.keys(styles).forEach(key => {
            // @ts-expect-error Style keys cannot be indexed with a string.
            result[key] = styles[key].static;
        });
        return result;
    }

    private getElementReferences(inputs: DocumentElementBindings["inputs"] = {}) {
        const references = new Set<string>();

        for (const [, binding] of Object.entries(inputs)) {
            if (binding.type === "slot") {
                if (Array.isArray(binding.static)) {
                    ((binding.static ?? []) as string[]).forEach(id => references.add(id));
                } else if (typeof binding.static === "string") {
                    references.add(binding.static);
                }
            }
        }

        return references;
    }
}
