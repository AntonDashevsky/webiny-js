import {
    type CmsEntryStorageOperationsGetPublishedByIdsParams,
    type CmsModel,
    type CmsStorageEntry
} from "~/types/index.js";

export interface IGetPublishedEntriesByIds {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetPublishedByIdsParams
    ) => Promise<CmsStorageEntry[]>;
}
