import { type CmsEntryStorageOperationsGetRevisionsParams, type CmsModel, type CmsStorageEntry } from "~/types/index.js";

export interface IGetRevisionsByEntryId {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetRevisionsParams
    ) => Promise<CmsStorageEntry[]>;
}
