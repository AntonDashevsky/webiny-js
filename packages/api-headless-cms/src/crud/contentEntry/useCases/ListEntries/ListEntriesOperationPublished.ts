import type { IListEntriesOperation } from "../../abstractions";
import type { CmsEntryStorageOperationsListParams, CmsModel } from "~/types";

export class ListEntriesOperationPublished implements IListEntriesOperation {
    private listEntries: IListEntriesOperation;

    constructor(listEntries: IListEntriesOperation) {
        this.listEntries = listEntries;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsListParams) {
        const where = { ...params.where, published: true };

        return await this.listEntries.execute(model, {
            ...params,
            where
        });
    }
}
