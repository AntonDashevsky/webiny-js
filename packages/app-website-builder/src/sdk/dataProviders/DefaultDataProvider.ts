import type { GetPageOptions, IDataProvider, Page } from "~/sdk/types.js";
import mockPage1 from "~/sdk/mocks/mockPage1";
import emptyPage from "~/sdk/mocks/emptyPage";
import type { ApiClient } from "~/sdk/dataProviders/ApiClient";
import { GET_PAGE_BY_PATH } from "./GET_PAGE_BY_PATH";

interface DefaultDataProviderConfig {
    apiClient: ApiClient;
}

export class DefaultDataProvider implements IDataProvider {
    private config: DefaultDataProviderConfig;

    constructor(config: DefaultDataProviderConfig) {
        this.config = config;
    }

    public async getPage(path: string, options: GetPageOptions = {}): Promise<Page | null> {
        const { preview = false } = options;

        const result = await this.config.apiClient.query({
            query: GET_PAGE_BY_PATH,
            variables: {
                path,
                preview
            },
            preview
        });

        const page = result.websiteBuilder.getPageByPath.data;

        return page;

        // const res = await fetch(`${this.apiEndpoint}?url=${encodeURIComponent(path)}&preview=${isServerPreview ? "1" : "0"}`);
        // return preview ? previewPage1 : mockPage1;
        // return path === "/page-1" ? mockPage1 : emptyPage;
    }

    public async listPages() {
        return [mockPage1, emptyPage];
    }
}
