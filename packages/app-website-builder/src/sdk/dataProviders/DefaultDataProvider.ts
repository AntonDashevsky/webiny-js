import type { IDataProvider, Page } from "~/sdk/types.js";
import { logger } from "../Logger";
import mockPage1 from "~/DocumentEditor/mocks/mockPage1";
import mockPage2 from "~/DocumentEditor/mocks/mockPage2";

interface DefaultDataProviderConfig {
    apiKey: string;
    apiEndpoint?: string;
}

export class DefaultDataProvider implements IDataProvider {
    private config: DefaultDataProviderConfig;

    constructor(config: DefaultDataProviderConfig) {
        this.config = config;
    }

    public async getPage(path: string): Promise<Page | null> {
        logger.info("IMPLEMENT: Loading page from API!");

        // const res = await fetch(`${this.apiEndpoint}?url=${encodeURIComponent(path)}&preview=${isServerPreview ? "1" : "0"}`);
        return path === "/page-1" ? mockPage1 : mockPage2;
    }

    public async listPages() {
        return [mockPage1, mockPage2];
    }
}
