import { type CmsEntryStorageOperationsRestoreFromBinParams, type CmsModel, type CmsStorageEntry } from "~/types/index.js";

export interface IRestoreEntryFromBinOperation {
    execute: (
        model: CmsModel,
        options: CmsEntryStorageOperationsRestoreFromBinParams
    ) => Promise<CmsStorageEntry>;
}
