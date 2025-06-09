import {
    type CmsEntryStorageOperationsListParams,
    type CmsEntryStorageOperationsListResponse,
    type CmsModel
} from "~/types/index.js";

export interface IListEntriesOperation {
    execute: (
        model: CmsModel,
        params: CmsEntryStorageOperationsListParams
    ) => Promise<CmsEntryStorageOperationsListResponse>;
}
