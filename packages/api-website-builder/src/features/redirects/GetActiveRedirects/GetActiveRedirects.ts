import type { IGetActiveRedirects } from "./IGetActiveRedirects.js";
import type { WbRedirect, WbRedirectsStorageOperations } from "~/context/redirects/redirects.types.js";

export class GetActiveRedirects implements IGetActiveRedirects {
    private readonly listOperation: WbRedirectsStorageOperations["list"];

    constructor(listOperation: WbRedirectsStorageOperations["list"]) {
        this.listOperation = listOperation;
    }

    async execute(): Promise<WbRedirect[]> {
        const [redirects] = await this.listOperation({
            where: {
                latest: true,
                isEnabled: true
            },
            limit: 10000,
            sort: [],
            after: null
        });

        return redirects;
    }
}
