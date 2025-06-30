import type { Document } from "~/sdk/types";

export type Metadata = Record<string, any>;

export interface IMetadata {
    get<T extends Metadata = Metadata>(id: string): T | undefined;
    set(id: string, data: any): void;
    unset(id?: string): void;
    applyToDocument(document: Document): void;
}
