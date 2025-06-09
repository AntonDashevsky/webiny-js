import { type CmsEntryStorageOperationsGetByIdsParams, type CmsModel, type CmsStorageEntry } from "~/types/index.js";

export interface IGetEntriesByIds {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetByIdsParams
    ) => Promise<CmsStorageEntry[]>;
}
