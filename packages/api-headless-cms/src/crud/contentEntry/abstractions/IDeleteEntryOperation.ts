import { CmsEntryStorageOperationsDeleteParams, CmsModel } from "~/types/index.js";

export interface IDeleteEntryOperation {
    execute: (model: CmsModel, options: CmsEntryStorageOperationsDeleteParams) => Promise<void>;
}
