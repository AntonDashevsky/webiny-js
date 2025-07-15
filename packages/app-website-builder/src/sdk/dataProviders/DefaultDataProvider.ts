import type { IDataProvider, Page, PublicPage } from "~/sdk/types.js";
import mockPage1 from "~/sdk/mocks/mockPage1";
import emptyPage from "~/sdk/mocks/emptyPage";
import type { ApiClient } from "~/sdk/dataProviders/ApiClient";
import { GET_PAGE_BY_PATH } from "./GET_PAGE_BY_PATH";
import { GET_PAGE_BY_ID } from "./GET_PAGE_BY_ID";

interface DefaultDataProviderConfig {
    apiClient: ApiClient;
}

export class DefaultDataProvider implements IDataProvider {
    private config: DefaultDataProviderConfig;

    constructor(config: DefaultDataProviderConfig) {
        this.config = config;
    }

    public async getPageByPath(path: string): Promise<Page | null> {
        const result = await this.config.apiClient.query({
            query: GET_PAGE_BY_PATH,
            variables: {
                path
            }
        });

        return result.websiteBuilder.getPageByPath.data;
    }

    public async getPageById(id: string): Promise<Page | null> {
        const result = await this.config.apiClient.query({
            query: GET_PAGE_BY_ID,
            variables: {
                id
            }
        });

        return result.websiteBuilder.getPageById.data;
    }

    public async listPages() {
        return [mockPage1, emptyPage] as PublicPage[];
    }
}
