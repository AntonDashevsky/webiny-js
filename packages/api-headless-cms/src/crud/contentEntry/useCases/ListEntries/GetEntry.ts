import { type IGetEntry, type IListEntriesOperation } from "~/crud/contentEntry/abstractions/index.js";
import { type CmsEntryGetParams, type CmsModel } from "~/types/index.js";
import { NotFoundError } from "@webiny/handler-graphql";

export class GetEntry implements IGetEntry {
    private listEntries: IListEntriesOperation;

    constructor(listEntries: IListEntriesOperation) {
        this.listEntries = listEntries;
    }

    async execute(model: CmsModel, params: CmsEntryGetParams) {
        const listParams = {
            ...params,
            limit: 1
        };

        const { items } = await this.listEntries.execute(model, listParams);

        const item = items.shift();

        if (!item) {
            throw new NotFoundError(`Entry not found!`);
        }

        return item;
    }
}
