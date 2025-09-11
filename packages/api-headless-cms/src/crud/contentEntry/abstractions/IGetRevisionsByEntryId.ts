import type {
    CmsEntryStorageOperationsGetRevisionsParams,
    CmsModel,
    CmsStorageEntry
} from "~/types/index.js";

export interface IGetRevisionsByEntryId {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetRevisionsParams
    ) => Promise<CmsStorageEntry[]>;
}
