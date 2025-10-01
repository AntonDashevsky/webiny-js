import type { IUnpublishPage } from "./IUnpublishPage.js";
import type {
    UnpublishWbPageParams,
    WbPagesStorageOperations
} from "~/context/pages/pages.types.js";

export class UnpublishPage implements IUnpublishPage {
    private readonly unpublishOperation: WbPagesStorageOperations["unpublish"];

    constructor(unpublishOperation: WbPagesStorageOperations["unpublish"]) {
        this.unpublishOperation = unpublishOperation;
    }

    async execute(params: UnpublishWbPageParams) {
        return await this.unpublishOperation(params);
    }
}
