import type { Document, DocumentElement } from "~/sdk/types.js";
import type { IDocumentOperation } from "./IDocumentOperation";

export class AddElement implements IDocumentOperation {
    private readonly element: DocumentElement;

    constructor(element: DocumentElement) {
        this.element = element;
    }

    apply(document: Document) {
        document.elements[this.element.id] = this.element;
    }
}
