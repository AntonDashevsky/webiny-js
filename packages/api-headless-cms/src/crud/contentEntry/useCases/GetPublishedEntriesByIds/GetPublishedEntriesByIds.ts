import { type IGetPublishedEntriesByIds } from "../../abstractions/index.js";
import {
    type CmsEntryStorageOperations,
    type CmsEntryStorageOperationsGetPublishedByIdsParams,
    type CmsModel
} from "~/types/index.js";

export class GetPublishedEntriesByIds implements IGetPublishedEntriesByIds {
    private operation: CmsEntryStorageOperations["getPublishedByIds"];

    constructor(operation: CmsEntryStorageOperations["getPublishedByIds"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetPublishedByIdsParams) {
        return await this.operation(model, params);
    }
}
