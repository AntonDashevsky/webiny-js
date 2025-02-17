import { IRestoreEntryFromBinOperation } from "~/crud/contentEntry/abstractions/index.js";
import {
    CmsEntryStorageOperations,
    CmsEntryStorageOperationsRestoreFromBinParams,
    CmsModel
} from "~/types/index.js";

export class RestoreEntryFromBinOperation implements IRestoreEntryFromBinOperation {
    private operation: CmsEntryStorageOperations["restoreFromBin"];

    constructor(operation: CmsEntryStorageOperations["restoreFromBin"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsRestoreFromBinParams) {
        return await this.operation(model, params);
    }
}
