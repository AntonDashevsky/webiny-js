import type { IUpdateRedirect } from "./IUpdateRedirect.js";
import type {
    UpdateWbRedirectData,
    WbRedirectsStorageOperations
} from "~/context/redirects/redirects.types.js";

export class UpdateRedirect implements IUpdateRedirect {
    private readonly updateOperation: WbRedirectsStorageOperations["update"];

    constructor(updateOperation: WbRedirectsStorageOperations["update"]) {
        this.updateOperation = updateOperation;
    }

    async execute(id: string, data: UpdateWbRedirectData) {
        return await this.updateOperation({ id, data });
    }
}
