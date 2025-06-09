import { type CmsDeleteEntryOptions, type CmsModel } from "~/types/index.js";

export interface IDeleteEntry {
    execute: (model: CmsModel, id: string, params: CmsDeleteEntryOptions) => Promise<void>;
}
