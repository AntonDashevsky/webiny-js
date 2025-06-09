import { type IGetLatestEntriesByIds } from "../../abstractions/index.js";
import {
    type CmsEntryStorageOperations,
    type CmsEntryStorageOperationsGetLatestByIdsParams,
    type CmsModel
} from "~/types/index.js";

export class GetLatestEntriesByIds implements IGetLatestEntriesByIds {
    private operation: CmsEntryStorageOperations["getLatestByIds"];

    constructor(operation: CmsEntryStorageOperations["getLatestByIds"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetLatestByIdsParams) {
        return await this.operation(model, params);
    }
}
