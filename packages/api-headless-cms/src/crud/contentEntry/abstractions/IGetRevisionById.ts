import { type CmsEntryStorageOperationsGetRevisionParams, type CmsModel, type CmsStorageEntry } from "~/types/index.js";

export interface IGetRevisionById {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsGetRevisionParams
    ) => Promise<CmsStorageEntry | null>;
}
