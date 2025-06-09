import { type IGetEntriesByIds } from "../../abstractions/index.js";
import {
    type CmsEntryStorageOperations,
    type CmsEntryStorageOperationsGetByIdsParams,
    type CmsModel
} from "~/types/index.js";

export class GetEntriesByIds implements IGetEntriesByIds {
    private operation: CmsEntryStorageOperations["getByIds"];

    constructor(operation: CmsEntryStorageOperations["getByIds"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetByIdsParams) {
        return await this.operation(model, params);
    }
}
