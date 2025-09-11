import type { IDeleteEntryOperation } from "../../abstractions/index.js";
import type {
    CmsEntryStorageOperations,
    CmsEntryStorageOperationsDeleteParams,
    CmsModel
} from "~/types/index.js";

export class DeleteEntryOperation implements IDeleteEntryOperation {
    private operation: CmsEntryStorageOperations["delete"];

    constructor(operation: CmsEntryStorageOperations["delete"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsDeleteParams) {
        await this.operation(model, params);
    }
}
