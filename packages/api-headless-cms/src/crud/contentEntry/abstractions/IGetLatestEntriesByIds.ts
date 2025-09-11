import type {
    CmsEntryStorageOperationsGetLatestByIdsParams,
    CmsModel,
    CmsStorageEntry
} from "~/types/index.js";

export interface IGetLatestEntriesByIds {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetLatestByIdsParams
    ) => Promise<CmsStorageEntry[]>;
}
