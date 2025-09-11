import type { IGetRedirectById } from "./IGetRedirectById.js";
import type { WbRedirectsStorageOperations } from "~/context/redirects/redirects.types.js";

export class GetRedirectById implements IGetRedirectById {
    private readonly getOperation: WbRedirectsStorageOperations["getById"];

    constructor(getOperation: WbRedirectsStorageOperations["getById"]) {
        this.getOperation = getOperation;
    }

    async execute(id: string) {
        return await this.getOperation(id);
    }
}
