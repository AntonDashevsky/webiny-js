import { type IGetRevisionsByEntryId } from "../../abstractions/index.js";
import {
    type CmsEntryStorageOperations,
    type CmsEntryStorageOperationsGetRevisionParams,
    type CmsModel
} from "~/types/index.js";

export class GetRevisionsByEntryId implements IGetRevisionsByEntryId {
    private operation: CmsEntryStorageOperations["getRevisions"];

    constructor(operation: CmsEntryStorageOperations["getRevisions"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetRevisionParams) {
        return await this.operation(model, params);
    }
}
