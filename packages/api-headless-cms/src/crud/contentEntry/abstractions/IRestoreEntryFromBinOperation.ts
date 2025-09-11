import type {
    CmsEntryStorageOperationsRestoreFromBinParams,
    CmsModel,
    CmsStorageEntry
} from "~/types/index.js";

export interface IRestoreEntryFromBinOperation {
    execute: (
        model: CmsModel,
        options: CmsEntryStorageOperationsRestoreFromBinParams
    ) => Promise<CmsStorageEntry>;
}
