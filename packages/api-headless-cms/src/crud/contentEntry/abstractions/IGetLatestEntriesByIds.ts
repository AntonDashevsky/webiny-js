import { type CmsEntryStorageOperationsGetLatestByIdsParams, type CmsModel, type CmsStorageEntry } from "~/types/index.js";

export interface IGetLatestEntriesByIds {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetLatestByIdsParams
    ) => Promise<CmsStorageEntry[]>;
}
