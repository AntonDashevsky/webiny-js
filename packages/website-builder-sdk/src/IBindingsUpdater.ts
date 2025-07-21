import type { JsonPatchOperation } from "~/jsonPatch";
import type { Document, DocumentElementBindings } from "~/types";

export interface IBindingsUpdater {
    applyToDocument(document: Document): void;
    createJsonPatch(bindings: DocumentElementBindings): JsonPatchOperation[];
}
