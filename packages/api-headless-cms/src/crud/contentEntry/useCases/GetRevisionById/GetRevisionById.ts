import { IGetRevisionById } from "../../abstractions/index.js";
import {
    CmsEntryStorageOperations,
    CmsEntryStorageOperationsGetRevisionParams,
    CmsModel
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
