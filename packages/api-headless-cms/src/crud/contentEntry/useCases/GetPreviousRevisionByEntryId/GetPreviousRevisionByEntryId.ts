import { IGetPreviousRevisionByEntryId } from "../../abstractions/index.js";
import {
    CmsEntryStorageOperations,
    CmsEntryStorageOperationsGetPreviousRevisionParams,
    CmsModel
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
