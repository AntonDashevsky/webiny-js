import type { CmsEntryStorageOperationsDeleteParams, CmsModel } from "~/types";

export interface IDeleteEntryOperation {
    execute: (model: CmsModel, options: CmsEntryStorageOperationsDeleteParams) => Promise<void>;
}
