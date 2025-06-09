import { type CmsEntryStorageOperationsMoveToBinParams, type CmsModel } from "~/types/index.js";

export interface IMoveEntryToBinOperation {
    execute: (model: CmsModel, params: CmsEntryStorageOperationsMoveToBinParams) => Promise<void>;
}
