import type { ICreatePageRevisionFrom } from "./ICreatePageRevisionFrom.js";
import type {
    CreateWbPageRevisionFromParams,
    WbPage,
    WbPagesStorageOperations
} from "~/context/pages/pages.types.js";

export class CreatePageRevisionFrom implements ICreatePageRevisionFrom {
    private readonly createRevisionFromOperation: WbPagesStorageOperations["createRevisionFrom"];

    constructor(createRevisionFromOperation: WbPagesStorageOperations["createRevisionFrom"]) {
        this.createRevisionFromOperation = createRevisionFromOperation;
    }

    async execute(params: CreateWbPageRevisionFromParams): Promise<WbPage> {
        return await this.createRevisionFromOperation(params);
    }
}
