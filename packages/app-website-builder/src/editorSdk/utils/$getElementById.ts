import type { Document } from "~/sdk/types.js";

export function $getElementById(document: Document, id: string) {
    return document.elements[id];
}
