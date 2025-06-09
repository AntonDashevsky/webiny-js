import { type IGetPreviousRevisionByEntryId } from "../../abstractions/index.js";
import {
    type CmsEntryStorageOperations,
    type CmsEntryStorageOperationsGetPreviousRevisionParams,
    type CmsModel
} from "~/types/index.js";

export class GetPreviousRevisionByEntryId implements IGetPreviousRevisionByEntryId {
    private operation: CmsEntryStorageOperations["getPreviousRevision"];

    constructor(operation: CmsEntryStorageOperations["getPreviousRevision"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetPreviousRevisionParams) {
        return await this.operation(model, params);
    }
}
