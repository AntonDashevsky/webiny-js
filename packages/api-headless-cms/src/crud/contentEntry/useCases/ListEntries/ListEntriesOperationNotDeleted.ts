import { IListEntriesOperation } from "../../abstractions/index.js";
import { CmsEntryStorageOperationsListParams, CmsModel } from "~/types/index.js";

export class ListEntriesOperationNotDeleted implements IListEntriesOperation {
    private listEntries: IListEntriesOperation;

    constructor(listEntries: IListEntriesOperation) {
        this.listEntries = listEntries;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsListParams) {
        const where = { ...params.where, wbyDeleted_not: true };

        return await this.listEntries.execute(model, {
            ...params,
            where
        });
    }
}
