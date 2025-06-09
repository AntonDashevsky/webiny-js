import { type IGetPublishedRevisionByEntryId } from "../../abstractions/index.js";
import {
    type CmsEntryStorageOperations,
    type CmsEntryStorageOperationsGetPublishedRevisionParams,
    type CmsModel
} from "~/types/index.js";

export class GetPublishedRevisionByEntryId implements IGetPublishedRevisionByEntryId {
    private operation: CmsEntryStorageOperations["getPublishedRevisionByEntryId"];

    constructor(operation: CmsEntryStorageOperations["getPublishedRevisionByEntryId"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetPublishedRevisionParams) {
        return await this.operation(model, params);
    }
}
