import type { IMoveEntryToBinOperation } from "~/crud/contentEntry/abstractions";
import type {
    CmsEntryStorageOperations,
    CmsEntryStorageOperationsMoveToBinParams,
    CmsModel
} from "~/types";

export class MoveEntryToBinOperation implements IMoveEntryToBinOperation {
    private operation: CmsEntryStorageOperations["moveToBin"];

    constructor(operation: CmsEntryStorageOperations["moveToBin"]) {
        this.operation = operation;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsMoveToBinParams) {
        await this.operation(model, params);
    }
}
