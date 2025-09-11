import type { IGetPageById } from "./IGetPageById.js";
import type { WbPagesStorageOperations } from "~/context/pages/pages.types.js";

export class GetPageById implements IGetPageById {
    private readonly getOperation: WbPagesStorageOperations["getById"];

    constructor(getOperation: WbPagesStorageOperations["getById"]) {
        this.getOperation = getOperation;
    }

    async execute(id: string) {
        return await this.getOperation(id);
    }
}
