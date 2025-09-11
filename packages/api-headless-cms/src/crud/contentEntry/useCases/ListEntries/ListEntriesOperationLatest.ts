import type { IListEntriesOperation } from "../../abstractions/index.js";
import type { CmsEntryStorageOperationsListParams, CmsModel } from "~/types/index.js";

export class ListEntriesOperationLatest implements IListEntriesOperation {
    private listEntries: IListEntriesOperation;

    constructor(listEntries: IListEntriesOperation) {
        this.listEntries = listEntries;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsListParams) {
        const where = { ...params.where, latest: true };

        return await this.listEntries.execute(model, {
            sort: ["createdOn_DESC"],
            ...params,
            where
        });
    }
}
