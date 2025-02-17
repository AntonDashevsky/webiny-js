import {
    CmsEntryStorageOperationsGetPreviousRevisionParams,
    CmsModel,
    CmsStorageEntry
} from "~/types/index.js";

export interface IGetPreviousRevisionByEntryId {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetPreviousRevisionParams
    ) => Promise<CmsStorageEntry | null>;
}
