import type { IRestoreEntryFromBinOperation } from "~/crud/contentEntry/abstractions";
import type {
    CmsEntryStorageOperations,
    CmsEntryStorageOperationsRestoreFromBinParams,
    CmsModel
} from "~/types";

export class RestoreEntryFromBinOperation implements IRestoreEntryFromBinOperation {
    private operation: CmsEntryStorageOperations["restoreFromBin"];

    constructor(operation: CmsEntryStorageOperations["restoreFromBin"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsRestoreFromBinParams) {
        return await this.operation(model, params);
    }
}
