import { CmsEntry, CmsEntryGetParams, CmsModel } from "~/types/index.js";

export interface IGetEntry {
    execute: (model: CmsModel, params: CmsEntryGetParams) => Promise<CmsEntry>;
}
