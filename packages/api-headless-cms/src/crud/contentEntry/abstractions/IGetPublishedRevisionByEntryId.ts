import {
    CmsEntryStorageOperationsGetPublishedRevisionParams,
    CmsModel,
    CmsStorageEntry
} from "~/types/index.js";

export interface IGetPublishedRevisionByEntryId {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetPublishedRevisionParams
    ) => Promise<CmsStorageEntry | null>;
}
