import type { ICreatePage } from "./ICreatePage.js";
import type { CreateWbPageData, WbPagesStorageOperations } from "~/context/pages/pages.types.js";

export class CreatePage implements ICreatePage {
    private readonly createOperation: WbPagesStorageOperations["create"];

    constructor(createOperation: WbPagesStorageOperations["create"]) {
        this.createOperation = createOperation;
    }

    async execute(data: CreateWbPageData) {
        return await this.createOperation({ data });
    }
}
