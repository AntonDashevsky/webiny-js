import type { IDataProvider, PublicPage } from "~/types.js";
import type { ApiClient } from "~/dataProviders/ApiClient";
import { GET_PAGE_BY_PATH } from "./GET_PAGE_BY_PATH";
import { GET_PAGE_BY_ID } from "./GET_PAGE_BY_ID";
import { LIST_PUBLISHED_PAGES } from "./LIST_PUBLISHED_PAGES";

interface DefaultDataProviderConfig {
    apiClient: ApiClient;
}

export class DefaultDataProvider implements IDataProvider {
    private config: DefaultDataProviderConfig;

    constructor(config: DefaultDataProviderConfig) {
        this.config = config;
    }

    public async getPageByPath(path: string): Promise<PublicPage | null> {
        const result = await this.config.apiClient.query({
            query: GET_PAGE_BY_PATH,
            variables: {
                path
            }
        });

        return result.websiteBuilder.getPageByPath.data;
    }

    public async getPageById(id: string): Promise<PublicPage | null> {
        const result = await this.config.apiClient.query({
            query: GET_PAGE_BY_ID,
            variables: {
                id
            }
        });

        return result.websiteBuilder.getPageById.data;
    }

    public async listPages() {
        const result = await this.config.apiClient.query({
            query: LIST_PUBLISHED_PAGES,
            variables: {
                where: {
                    published: true
                }
            }
        });

        return result.websiteBuilder.listPages.data ?? [];
    }
}
