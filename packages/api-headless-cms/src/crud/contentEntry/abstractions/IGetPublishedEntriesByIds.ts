import {
    CmsEntryStorageOperationsGetPublishedByIdsParams,
    CmsModel,
    CmsStorageEntry
} from "~/types/index.js";

export interface IGetPublishedEntriesByIds {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetPublishedByIdsParams
    ) => Promise<CmsStorageEntry[]>;
}
