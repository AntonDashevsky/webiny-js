import type { IGetActiveRedirects } from "./IGetActiveRedirects";
import type { WbRedirect, WbRedirectsStorageOperations } from "~/context/redirects/redirects.types";

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
