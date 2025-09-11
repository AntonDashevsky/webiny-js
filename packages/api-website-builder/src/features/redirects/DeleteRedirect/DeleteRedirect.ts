import type { IDeleteRedirect } from "./IDeleteRedirect.js";
import type {
    DeleteWbRedirectParams,
    WbRedirectsStorageOperations
} from "~/context/redirects/redirects.types.js";

export class DeleteRedirect implements IDeleteRedirect {
    private readonly deleteOperation: WbRedirectsStorageOperations["delete"];

    constructor(deleteOperation: WbRedirectsStorageOperations["delete"]) {
        this.deleteOperation = deleteOperation;
    }

    async execute(params: DeleteWbRedirectParams) {
        await this.deleteOperation(params);
    }
}
