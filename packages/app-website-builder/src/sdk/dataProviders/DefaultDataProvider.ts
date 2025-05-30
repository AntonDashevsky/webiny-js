import type { IDataProvider, Page } from "~/sdk/types.js";
import { logger } from "../Logger";
import mockPage1 from "~/DocumentEditor/mocks/mockPage1";

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

        return mockPage1;
    }

    public async listPages() {
        return [mockPage1];
    }
}
