import type { IDataProvider, Page } from "~/sdk/types.js";

export class NullDataProvider implements IDataProvider {
    public async getPage(): Promise<Page | null> {
        return null;
    }

    public async listPages() {
        return [];
    }
}
