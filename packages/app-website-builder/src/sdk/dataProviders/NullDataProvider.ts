import type { IDataProvider, Page } from "~/sdk/types.js";

export class NullDataProvider implements IDataProvider {
    getPageById(): Promise<Page | null> {
        return Promise.resolve(null);
    }

    getPageByPath(): Promise<Page | null> {
        return Promise.resolve(null);
    }

    public async listPages() {
        return [];
    }
}
