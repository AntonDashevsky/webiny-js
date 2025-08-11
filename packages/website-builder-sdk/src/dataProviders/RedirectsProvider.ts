import type { ApiClient } from "./ApiClient";
import type { IRedirects } from "~/IRedirects";
import type { PublicRedirect } from "~/types";

export class RedirectsProvider implements IRedirects {
    private redirectsCache: Map<string, PublicRedirect> | undefined = undefined;
    private apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    async getRedirectByPath(path: string): Promise<PublicRedirect | undefined> {
        await this.populateCache();

        if (!this.redirectsCache) {
            return undefined;
        }

        return this.redirectsCache.get(path);
    }

    async getAllRedirects(): Promise<Map<string, PublicRedirect>> {
        await this.populateCache();
        return this.redirectsCache ?? new Map();
    }

    private async populateCache() {
        const redirects: PublicRedirect[] = await this.apiClient.fetch({ path: "/wb/redirects" });

        this.redirectsCache = new Map();
        for (const redirect of redirects) {
            this.redirectsCache.set(redirect.from, redirect);
        }
    }
}
