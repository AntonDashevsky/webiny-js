import type { IGetRevisionsByEntryId } from "../../abstractions";
import type {
    CmsEntryStorageOperations,
    CmsEntryStorageOperationsGetRevisionParams,
    CmsModel
} from "~/types";

export class GetRevisionsByEntryId implements IGetRevisionsByEntryId {
    private operation: CmsEntryStorageOperations["getRevisions"];

    constructor(operation: CmsEntryStorageOperations["getRevisions"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetRevisionParams) {
        return await this.operation(model, params);
    }
}
