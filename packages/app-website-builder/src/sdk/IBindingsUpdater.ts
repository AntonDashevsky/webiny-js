import type { Operation } from "fast-json-patch";
import type { Document, DocumentElementBindings } from "~/sdk/types";

export interface IBindingsUpdater {
    applyToDocument(document: Document): void;
    createJsonPatch(bindings: DocumentElementBindings): Operation[];
}
