import { type IGetLatestRevisionByEntryId } from "../../abstractions/index.js";
import {
    type CmsEntryStorageOperations,
    type CmsEntryStorageOperationsGetLatestRevisionParams,
    type CmsModel
} from "~/types/index.js";

export class GetLatestRevisionByEntryId implements IGetLatestRevisionByEntryId {
    private operation: CmsEntryStorageOperations["getLatestRevisionByEntryId"];

    constructor(operation: CmsEntryStorageOperations["getLatestRevisionByEntryId"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetLatestRevisionParams) {
        return await this.operation(model, params);
    }
}
