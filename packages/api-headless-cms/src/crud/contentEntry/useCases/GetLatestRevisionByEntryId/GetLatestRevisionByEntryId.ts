import { IGetLatestRevisionByEntryId } from "../../abstractions/index.js";
import {
    CmsEntryStorageOperations,
    CmsEntryStorageOperationsGetLatestRevisionParams,
    CmsModel
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
