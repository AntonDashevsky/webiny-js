import type { ApiClient } from "./ApiClient";
import type { IRedirects } from "~/IRedirects";
import type { PublicRedirect } from "~/types";
import { GET_ACTIVE_REDIRECTS } from "~/dataProviders/GET_ACTIVE_REDIRECTS";

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
        console.time("Populating redirects cache from API");
        const result = await this.apiClient.query({
            query: GET_ACTIVE_REDIRECTS,
            variables: {}
        });

        const redirects: PublicRedirect[] = result.websiteBuilder.getActiveRedirects.data ?? [];

        this.redirectsCache = new Map();
        for (const redirect of redirects) {
            this.redirectsCache.set(redirect.from, redirect);
        }
        console.timeEnd("Populating redirects cache from API");
    }
}
