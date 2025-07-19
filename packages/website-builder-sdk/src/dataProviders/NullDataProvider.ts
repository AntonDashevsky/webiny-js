import type { IDataProvider, Page } from "~/types.js";

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
