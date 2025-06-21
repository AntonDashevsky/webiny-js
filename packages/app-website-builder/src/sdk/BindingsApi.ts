import type { ElementFactory, Operation } from "~/sdk/ElementFactory";
import { InputAstNode } from "./ComponentManifestToAstConverter";
import { DocumentElementBindings, DocumentElementStyleBindings } from "~/sdk/types";
import { createElement } from "./createElement";
import set from "lodash/set";

type FlatBindings = Record<string, Record<string, any>>;
type DeepBindings = Record<string, any>;

export class BindingsApi {
    public inputs: DeepBindings = {};
    public styles: DeepBindings = {};
    private readonly elementId: string;
    private readonly inputsAst: InputAstNode[];
    private elementFactory: ElementFactory;
    private operations: Operation[] = [];
    private elementReferences: Set<string>;
    private originalBindings: DocumentElementBindings;

    constructor(
        elementId: string,
        bindings: DocumentElementBindings,
        inputsAst: InputAstNode[],
        elementFactory: ElementFactory
    ) {
        this.elementId = elementId;
        this.inputsAst = inputsAst;
        this.elementFactory = elementFactory;
        this.originalBindings = bindings;
        this.inputs = this.toDeep(bindings.inputs || {}, this.inputsAst);
        this.styles = this.toDeepStyles(bindings.styles || {});
        this.elementReferences = this.getElementReferences(bindings.inputs);
    }

    public getOperations(): Operation[] {
        return this.operations;
    }

    public getPublicApi(displayMode: string) {
        if (!this.styles[displayMode]) {
            this.styles[displayMode] = {};
        }

        return {
            inputs: this.inputs,
            styles: this.styles,
            createElement: this.createElement
        };
    }

    public toFlatBindings(): FlatBindings {
        const originalInputs = this.originalBindings.inputs ?? {};
        const rebuild: FlatBindings = { inputs: {}, styles: {} };
        const seenPaths = new Set();

        const apply = (obj: any, path: string): any => {
            const keys = path
                .split(/\.|\[(\d+)\]/)
                .filter(Boolean)
                .map(k => (/\d+/.test(k) ? +k : k));
            return keys.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
        };

        const processAst = (
            nodes: InputAstNode[],
            prefix: string[],
            scope: "inputs" | "styles"
        ) => {
            for (const node of nodes) {
                const pathParts = [...prefix, node.name];
                const path = pathParts.join(".");
                seenPaths.add(path);

                if (node.children.length) {
                    if (node.list) {
                        const list = apply(scope === "inputs" ? this.inputs : this.styles, path);
                        if (Array.isArray(list)) {
                            for (let i = 0; i < list.length; i++) {
                                processAst(
                                    node.children,
                                    [...pathParts.slice(0, -1), `${node.name}[${i}]`],
                                    scope
                                );
                            }
                        }
                    } else {
                        processAst(node.children, pathParts, scope);
                    }
                } else {
                    const value = apply(scope === "inputs" ? this.inputs : this.styles, path);
                    if (value !== undefined) {
                        if (typeof value === "object" && value.action === "CreateElement") {
                            const childOps = this.elementFactory.generateOperations({
                                componentName: value.params.component,
                                parentId: this.elementId,
                                slot: path,
                                index: -1,
                                defaults: value.params
                            });

                            const created = childOps.find(op => op.type === "add-element");
                            if (created && created.type === "add-element") {
                                const createdId = created.element.id;
                                rebuild[scope][path] = {
                                    static: node.list ? [createdId] : createdId,
                                    type: node.type,
                                    dataType: node.dataType
                                };
                            }

                            this.operations.push(...childOps);
                        } else {
                            const original = rebuild[scope][path] ?? originalInputs[path] ?? {};
                            rebuild[scope][path] = {
                                ...original,
                                static: value,
                                type: node.type,
                                dataType: node.dataType,
                                list: node.list
                            };
                        }
                    }
                }
            }
        };

        processAst(this.inputsAst, [], "inputs");
        console.log("seenPaths", seenPaths);

        // Preserve untouched original inputs (e.g. expressions)
        for (const [key, value] of Object.entries(originalInputs)) {
            if (!seenPaths.has(key)) {
                // untouched, copy over as-is
                rebuild.inputs[key] = value;
            } else if (!(key in rebuild.inputs)) {
                // was deleted by onChange — do NOT preserve
            }
        }

        const usedSlotIds = this.getElementReferences(rebuild.inputs);

        for (const id of this.elementReferences) {
            if (!usedSlotIds.has(id)) {
                this.operations.push({
                    type: "remove-element",
                    elementId: id
                });
            }
        }

        rebuild.styles = this.flattenStyles(this.styles);

        return rebuild;
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
        Object.keys(styles).forEach(screenSize => {
            Object.keys(styles[screenSize]).forEach(key => {
                // @ts-expect-error Style keys cannot be indexed with a string.
                set(result, `${screenSize}.${key}`, styles[screenSize][key].static);
            });
        });
        return result;
    }

    private createElement(params: Parameters<typeof createElement>[0]) {
        return createElement(params);
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
