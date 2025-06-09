import {
    type CmsEntryStorageOperationsGetLatestRevisionParams,
    type CmsModel,
    type CmsStorageEntry
} from "~/types/index.js";

export interface IGetLatestRevisionByEntryId {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetLatestRevisionParams
    ) => Promise<CmsStorageEntry | null>;
}
