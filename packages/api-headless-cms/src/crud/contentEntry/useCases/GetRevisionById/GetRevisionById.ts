import { type IGetRevisionById } from "../../abstractions/index.js";
import {
    type CmsEntryStorageOperations,
    type CmsEntryStorageOperationsGetRevisionParams,
    type CmsModel
} from "~/types/index.js";

export class GetRevisionById implements IGetRevisionById {
    private operation: CmsEntryStorageOperations["getRevisionById"];

    constructor(operation: CmsEntryStorageOperations["getRevisionById"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetRevisionParams) {
        return await this.operation(model, params);
    }
}
