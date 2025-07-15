import { GetPageOptions, IContentSdk, IDataProvider, ListPagesOptions, Page } from "~/sdk/types.js";
import { documentStoreManager } from "~/sdk/DocumentStoreManager";

export type LiveSdkConfig = {
    apiKey: string;
    apiEndpoint: string;
};

export class LiveSdk implements IContentSdk {
    private dataProvider: IDataProvider;

    constructor(dataProvider: IDataProvider) {
        this.dataProvider = dataProvider;
    }

    async getPage(path: string, options?: GetPageOptions): Promise<Page | null> {
        const page = await this.dataProvider.getPageByPath(path, options);
        if (page) {
            documentStoreManager.getStore(page.properties.id).setDocument(page);
        }
        return page;
    }

    listPages(options?: ListPagesOptions): Promise<Page[]> {
        return this.dataProvider.listPages(options);
    }
}
