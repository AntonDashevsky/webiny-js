import {
    type CmsEntryStorageOperationsGetPreviousRevisionParams,
    type CmsModel,
    type CmsStorageEntry
} from "~/types/index.js";

export interface IGetPreviousRevisionByEntryId {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetPreviousRevisionParams
    ) => Promise<CmsStorageEntry | null>;
}
