import { IListEntriesOperation } from "../../abstractions/index.js";
import { CmsEntryStorageOperations, CmsEntryStorageOperationsListParams, CmsModel } from "~/types/index.js";

export class ListEntriesOperation implements IListEntriesOperation {
    private operation: CmsEntryStorageOperations["list"];

    constructor(operation: CmsEntryStorageOperations["list"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsListParams) {
        return await this.operation(model, params);
    }
}
