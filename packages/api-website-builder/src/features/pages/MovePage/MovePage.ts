import type { IMovePage } from "./IMovePage.js";
import type { MoveWbPageParams, WbPagesStorageOperations } from "~/context/pages/pages.types.js";

export class MovePage implements IMovePage {
    private readonly moveOperation: WbPagesStorageOperations["move"];

    constructor(moveOperation: WbPagesStorageOperations["move"]) {
        this.moveOperation = moveOperation;
    }

    async execute(params: MoveWbPageParams) {
        await this.moveOperation(params);
    }
}
