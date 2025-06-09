import { type IListEntriesOperation } from "../../abstractions/index.js";
import { type CmsEntryStorageOperationsListParams, type CmsModel } from "~/types/index.js";
import { type ListEntriesUseCasesTopics } from "./index.js";

export class ListEntriesOperationWithEvents implements IListEntriesOperation {
    private topics: ListEntriesUseCasesTopics;
    private listEntries: IListEntriesOperation;

    constructor(topics: ListEntriesUseCasesTopics, listEntries: IListEntriesOperation) {
        this.topics = topics;
        this.listEntries = listEntries;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsListParams) {
        await this.topics.onEntryBeforeList.publish({
            model,
            where: params.where
        });

        return await this.listEntries.execute(model, params);
    }
}
