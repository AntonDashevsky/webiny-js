import type {
    CmsEntryStorageOperationsGetByIdsParams,
    CmsModel,
    CmsStorageEntry
} from "~/types/index.js";

export interface IGetEntriesByIds {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetByIdsParams
    ) => Promise<CmsStorageEntry[]>;
}
