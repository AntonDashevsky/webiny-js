import {
    type CmsEntryStorageOperationsGetPublishedRevisionParams,
    type CmsModel,
    type CmsStorageEntry
} from "~/types/index.js";

export interface IGetPublishedRevisionByEntryId {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetPublishedRevisionParams
    ) => Promise<CmsStorageEntry | null>;
}
