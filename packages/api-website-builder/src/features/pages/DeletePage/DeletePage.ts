import type { IDeletePage } from "./IDeletePage.js";
import type { DeleteWbPageParams, WbPagesStorageOperations } from "~/context/pages/pages.types.js";

export class DeletePage implements IDeletePage {
    private readonly deleteOperation: WbPagesStorageOperations["delete"];

    constructor(deleteOperation: WbPagesStorageOperations["delete"]) {
        this.deleteOperation = deleteOperation;
    }

    async execute(params: DeleteWbPageParams) {
        await this.deleteOperation(params);
    }
}
