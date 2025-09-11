import type { IListPages, ListWbPagesParams, WbListMeta } from "./IListPages.js";
import type { WbPage, WbPagesStorageOperations } from "~/context/pages/pages.types.js";

export class ListPages implements IListPages {
    private readonly listOperation: WbPagesStorageOperations["list"];

    constructor(listOperation: WbPagesStorageOperations["list"]) {
        this.listOperation = listOperation;
    }

    async execute(params: ListWbPagesParams): Promise<[WbPage[], WbListMeta]> {
        return await this.listOperation(params);
    }
}
