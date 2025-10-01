import type { IListRedirects, ListWbRedirectsParams, WbListMeta } from "./IListRedirects.js";
import type {
    WbRedirect,
    WbRedirectsStorageOperations
} from "~/context/redirects/redirects.types.js";

export class ListRedirects implements IListRedirects {
    private readonly listOperation: WbRedirectsStorageOperations["list"];

    constructor(listOperation: WbRedirectsStorageOperations["list"]) {
        this.listOperation = listOperation;
    }

    async execute(params: ListWbRedirectsParams): Promise<[WbRedirect[], WbListMeta]> {
        return await this.listOperation(params);
    }
}
