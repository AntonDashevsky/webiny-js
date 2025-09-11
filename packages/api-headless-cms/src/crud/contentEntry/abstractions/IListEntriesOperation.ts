import type {
    CmsEntryStorageOperationsListParams,
    CmsEntryStorageOperationsListResponse,
    CmsModel
} from "~/types/index.js";

export interface IListEntriesOperation {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsListParams
    ) => Promise<CmsEntryStorageOperationsListResponse>;
}
