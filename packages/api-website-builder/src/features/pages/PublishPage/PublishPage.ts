import type { IPublishPage } from "./IPublishPage.js";
import type { PublishWbPageParams, WbPagesStorageOperations } from "~/context/pages/pages.types.js";

export class PublishPage implements IPublishPage {
    private readonly publishOperation: WbPagesStorageOperations["publish"];

    constructor(publishOperation: WbPagesStorageOperations["publish"]) {
        this.publishOperation = publishOperation;
    }

    async execute(params: PublishWbPageParams) {
        return await this.publishOperation(params);
    }
}
