import { type IListEntriesOperation } from "../../abstractions/index.js";
import { type CmsEntryStorageOperationsListParams, type CmsModel } from "~/types/index.js";

export class ListEntriesOperationDeleted implements IListEntriesOperation {
    private listEntries: IListEntriesOperation;

    constructor(listEntries: IListEntriesOperation) {
        this.listEntries = listEntries;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsListParams) {
        const where = { ...params.where, wbyDeleted: true };

        return await this.listEntries.execute(model, {
            ...params,
            where
        });
    }
}
