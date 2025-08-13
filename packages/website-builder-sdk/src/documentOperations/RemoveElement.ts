import type { Document } from "~/types.js";
import type { IDocumentOperation } from "./IDocumentOperation.js";

export class RemoveElement implements IDocumentOperation {
    private readonly elementId: string;

    constructor(elementId: string) {
        this.elementId = elementId;
    }

    apply(document: Document) {
        delete document.elements[this.elementId];
    }
}
