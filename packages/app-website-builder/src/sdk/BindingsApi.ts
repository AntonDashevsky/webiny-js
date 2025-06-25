import set from "lodash/set";
import type { ElementFactory } from "~/sdk/ElementFactory";
import type { InputAstNode } from "./ComponentManifestToAstConverter";
import type { DocumentElementBindings } from "~/sdk/types";
import type { IDocumentOperation } from "./documentOperations/IDocumentOperation";
import { createElement, type CreateElementParams } from "./createElement";
import { DocumentOperations } from "~/sdk/documentOperations";
import { InheritedValueResolver } from "~/sdk/InheritedValueResolver";

export type FlatBindings = Record<string, Record<string, any>>;
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
    private rawBindings: DocumentElementBindings;
    private breakpoints: string[];

    constructor(
        elementId: string,
        rawBindings: DocumentElementBindings,
        resolvedBindings: DocumentElementBindings,
        inputsAst: InputAstNode[],
        elementFactory: ElementFactory,
        breakpoint: string
    ) {
        this.breakpoint = breakpoint;
        // TODO: improve handling of breakpoints.
        this.breakpoints = ["desktop", "tablet", "mobile"];
        this.elementId = elementId;
        this.inputsAst = inputsAst;
        this.elementFactory = elementFactory;
        this.rawBindings = rawBindings;
        this.inputs = this.toDeep(resolvedBindings.inputs || {}, this.inputsAst);
        this.styles = this.toDeepStyles(resolvedBindings.styles || {});
        this.elementReferences = this.getElementReferences(rawBindings.inputs);
    }

    public getOperations(): IDocumentOperation[] {
        return this.operations;
    }

    public getPublicApi() {
        return {
            inputs: this.inputs,
            styles: this.styles ?? {},
            createElement: (params: CreateElementParams) => {
                return createElement(params);
            }
        };
    }

    /**
     * Converts the internal deep bindings representation back into a flat structure suitable for storage or transmission.
     * This method traverses the input AST, compares current input values with the original raw bindings,
     * and constructs a flat bindings object that includes any changes, new elements, and responsive overrides.
     *
     * It also identifies elements that were removed from slot bindings and schedules their removal operations.
     * Styles are flattened back to their original structure with static value wrappers.
     *
     * @returns A flat bindings object with inputs, styles, and any breakpoint overrides.
     */
    public toFlatBindings(): FlatBindings {
        const originalInputs = this.rawBindings.inputs ?? {};
        const originalStyles = this.rawBindings.styles ?? {};

        const rebuilt: FlatBindings = { inputs: {}, styles: originalStyles, overrides: {} };

        // Clone existing overrides if present, to avoid losing breakpoint overrides
        if (this.rawBindings.overrides) {
            rebuilt.overrides = structuredClone(this.rawBindings.overrides);
        }

        // Set to track which flat binding paths we've processed during traversal
        const seenPaths = new Set<string>();
        const valueResolver = new InheritedValueResolver(this.breakpoints, bp => {
            if (this.isBaseBreakpoint(bp)) {
                return this.rawBindings.inputs;
            }
            return this.rawBindings.overrides?.[bp]?.inputs;
        });

        /**
         * Extracts a nested value from an object based on a flat string path.
         * Supports array indexes like 'rows[0].columns[1].children'.
         *
         * @param obj - The nested object to traverse
         * @param path - The flat path string
         * @returns The value at the specified path, or undefined if not found
         */
        const getValue = (obj: any, path: string): any => {
            const keys = path
                .split(/\.|\[(\d+)\]/) // Split by dot or array index
                .filter(Boolean)
                .map(k => (/\d+/.test(k) ? +k : k));
            return keys.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
        };

        /**
         * Recursively traverses the AST nodes, comparing new input values with original bindings.
         * Collects changed values into 'rebuilt' and generates operations for new elements.
         *
         * @param nodes - Array of AST nodes to traverse
         * @param prefix - Array of path segments for current recursion level
         */
        const compareAndCollect = (nodes: InputAstNode[], prefix: string[]) => {
            for (const node of nodes) {
                const pathParts = [...prefix, node.name];
                const flatKey = pathParts.join(".");

                // Mark this path as seen
                seenPaths.add(flatKey);

                if (node.children.length) {
                    if (node.list) {
                        // For list nodes, process each indexed item separately
                        const list = getValue(this.inputs, flatKey);
                        if (Array.isArray(list)) {
                            for (let i = 0; i < list.length; i++) {
                                // Recurse with indexed path like 'rows[0]', 'rows[1]'
                                compareAndCollect(node.children, [
                                    ...pathParts.slice(0, -1),
                                    `${node.name}[${i}]`
                                ]);
                            }
                        }
                    } else {
                        // For single object nodes, recurse normally
                        compareAndCollect(node.children, pathParts);
                    }
                } else {
                    // Leaf node (primitive or slot) processing

                    // Get current new value from deep inputs
                    const newValue = getValue(this.inputs, flatKey);

                    // Get original binding entry for this path
                    const originalEntry = originalInputs[flatKey];

                    // If new value is undefined, skip (treat as deleted or missing)
                    if (newValue === undefined) {
                        continue;
                    }

                    if (typeof newValue === "object" && newValue.action === "CreateElement") {
                        // Handle CreateElement action by generating element and operations
                        const newElement = this.elementFactory.createElementFromComponent({
                            componentName: newValue.params.component,
                            parentId: this.elementId,
                            slot: flatKey,
                            index: -1,
                            bindings: newValue.params
                        });

                        const createdId = newElement.element.id;

                        // Build binding for the new element id(s)
                        const binding = {
                            static: node.list ? [createdId] : createdId,
                            type: node.type,
                            dataType: node.dataType,
                            list: node.list
                        };

                        if (node.input?.responsive && !this.isBaseBreakpoint(this.breakpoint)) {
                            const inheritedValue = valueResolver.getInheritedValue(
                                flatKey,
                                this.breakpoint
                            );

                            if (!inheritedValue || inheritedValue !== binding.static) {
                                if (!rebuilt.overrides[this.breakpoint]) {
                                    rebuilt.overrides[this.breakpoint] = {};
                                }

                                if (!rebuilt.overrides[this.breakpoint].inputs) {
                                    rebuilt.overrides[this.breakpoint].inputs = {};
                                }

                                rebuilt.overrides[this.breakpoint].inputs[flatKey] = binding;
                            }

                            if (originalEntry) {
                                rebuilt.inputs[flatKey] = originalEntry;
                            }
                        } else {
                            // Normal case: update base inputs
                            rebuilt.inputs[flatKey] = binding;
                        }

                        // Add generated operations for this element creation
                        this.operations.push(...newElement.operations);
                    } else {
                        // Normal value update
                        const isResponsive =
                            node.input?.responsive && !this.isBaseBreakpoint(this.breakpoint);

                        // Merge existing original entry data with updated static value
                        const binding = {
                            ...(originalEntry ?? {}),
                            static: newValue,
                            type: node.type,
                            dataType: node.dataType,
                            list: node.list
                        };

                        if (isResponsive) {
                            const inheritedValue = valueResolver.getInheritedValue(
                                flatKey,
                                this.breakpoint
                            );

                            if (!inheritedValue || inheritedValue !== binding.static) {
                                if (!rebuilt.overrides[this.breakpoint]) {
                                    rebuilt.overrides[this.breakpoint] = {};
                                }

                                if (!rebuilt.overrides[this.breakpoint].inputs) {
                                    rebuilt.overrides[this.breakpoint].inputs = {};
                                }

                                rebuilt.overrides[this.breakpoint].inputs[flatKey] = binding;
                            }

                            // If override value is the same as inherited value, delete the override.
                            if (inheritedValue && inheritedValue === binding.static) {
                                delete rebuilt.overrides[this.breakpoint].inputs[flatKey];
                            }

                            if (originalEntry) {
                                rebuilt.inputs[flatKey] = originalEntry;
                            }
                        } else {
                            // Base binding update
                            rebuilt.inputs[flatKey] = binding;
                        }
                    }
                }
            }
        };

        // Start the AST traversal and collection
        compareAndCollect(this.inputsAst, []);

        /**
         * Identify elements referenced in slots that were removed since last state,
         * and queue their removal.
         */
        const usedSlotIds = this.getElementReferences(rebuilt.inputs);
        for (const id of this.elementReferences) {
            if (!usedSlotIds.has(id)) {
                this.operations.push(new DocumentOperations.RemoveElement(id));
            }
        }

        // Convert deep styles back to flattened bindings
        this.flattenStyles(rebuilt, this.styles);

        // Remove empty inputs and styles overrides.
        for (const [breakpoint, overrides] of Object.entries(rebuilt.overrides)) {
            if (Object.keys(overrides.inputs ?? {}).length === 0) {
                delete rebuilt.overrides[breakpoint].inputs;
            }
            if (Object.keys(overrides.styles || {}).length === 0) {
                delete rebuilt.overrides[breakpoint].styles;
            }
        }

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
    private flattenStyles(rebuilt: FlatBindings, styles: DeepBindings): void {
        const valueResolver = new InheritedValueResolver(this.breakpoints, breakpoint => {
            if (breakpoint === "desktop") {
                return this.rawBindings.styles;
            }
            return this.rawBindings.overrides?.[breakpoint]?.styles;
        });

        for (const [key, value] of Object.entries(styles)) {
            if (this.isBaseBreakpoint(this.breakpoint)) {
                // Base breakpoint: always assign styles directly
                set(rebuilt, `styles.${key}.static`, value);
            } else {
                // Non-base breakpoint: check the inheritance chain
                const inheritedValue = valueResolver.getInheritedValue(key, this.breakpoint);

                if (value !== inheritedValue) {
                    set(rebuilt, `overrides.${this.breakpoint}.styles.${key}.static`, value);
                }
                // else skip assignment to avoid redundant override
            }
        }
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

    private isBaseBreakpoint(name: string) {
        return this.breakpoints.indexOf(name) === 0;
    }
}
