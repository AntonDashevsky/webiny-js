import type { IDataProvider, PublicPage } from "~/types.js";
import type { ApiClient } from "~/dataProviders/ApiClient";
import { GET_PAGE_BY_PATH } from "./GET_PAGE_BY_PATH";
import { GET_PAGE_BY_ID } from "./GET_PAGE_BY_ID";
import { LIST_PUBLISHED_PAGES } from "./LIST_PUBLISHED_PAGES";

interface DefaultDataProviderConfig {
    apiClient: ApiClient;
}

const ignoreActions = [".well-known", "_next"];

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

        this.checkForErrors(`getPageByPath:${path}`, result.websiteBuilder.getPageByPath);

        return result.websiteBuilder.getPageByPath.data;
    }

    public async getPageById(id: string): Promise<PublicPage | null> {
        const result = await this.config.apiClient.query({
            query: GET_PAGE_BY_ID,
            variables: {
                id
            }
        });

        this.checkForErrors("getPageById", result.websiteBuilder.getPageById);

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

        this.checkForErrors("listPages", result.websiteBuilder.listPages);

        return result.websiteBuilder.listPages.data ?? [];
    }

    private checkForErrors(action: string, data: any) {
        if (data.error) {
            // TODO: investigate how these ignored actions make their way to the SDK.
            if (ignoreActions.some(item => action.includes(item))) {
                return;
            }
            console.error(`Could not execute "${action}". Reason: ${data.error.message}`);
        }
    }
}
