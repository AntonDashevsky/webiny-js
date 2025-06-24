import type { Document } from "~/sdk/types.js";

export interface IDocumentOperation {
    apply(document: Document): void;
}
