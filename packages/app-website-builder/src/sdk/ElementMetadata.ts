import type { Document } from "~/sdk/types";

export type Metadata = Record<string, any>;

export interface IElementMetadata {
    get<T extends Metadata = Metadata>(id: string): T | undefined;
    set(id: string, data: any): void;
    unset(id: string): void;
    applyToDocument(document: Document): void;
}

export class NullElementMetadata implements IElementMetadata {
    applyToDocument(): void {}

    get<T extends Metadata = Metadata>(): T | undefined {
        return undefined;
    }

    set(): void {}

    unset(): void {}
}

export class ElementMetadata implements IElementMetadata {
    private readonly elementId: string;
    private readonly metadata: Record<string, any>;

    constructor(elementId: string, metadata: Record<string, any> = {}) {
        this.elementId = elementId;
        this.metadata = metadata;
    }

    get<T extends Metadata = Metadata>(id: string): T | undefined {
        return this.metadata[id];
    }

    set(id: string, data: Metadata): void {
        this.metadata[id] = data;
    }

    unset(id: string): void {
        delete this.metadata[id];
    }

    applyToDocument(document: Document) {
        document.bindings[this.elementId].metadata = this.metadata;
    }
}

export class BreakpointElementMetadata implements IElementMetadata {
    private readonly breakpoints: string[];
    private readonly currentBreakpoint: string;
    private metadata: ElementMetadata;

    constructor(breakpoints: string[], currentBreakpoint: string, metadata: ElementMetadata) {
        this.breakpoints = breakpoints;
        this.currentBreakpoint = currentBreakpoint;
        this.metadata = metadata;
    }

    applyToDocument(document: Document): void {
        this.metadata.applyToDocument(document);
    }

    get<T extends Metadata = Metadata>(id: string): T | undefined {
        const upTo = this.breakpoints.indexOf(this.currentBreakpoint);

        for (let i = upTo; i >= 0; i--) {
            const breakpoint = this.breakpoints[i];
            const data = this.metadata.get<T>(`${breakpoint}/${id}`);
            if (data !== undefined) {
                return data;
            }
        }

        return undefined;
    }

    set(id: string, data: any): void {
        this.metadata.set(`${this.currentBreakpoint}/${id}`, data);
    }

    unset(id: string): void {
        this.metadata.unset(`${this.currentBreakpoint}/${id}`);
    }
}
