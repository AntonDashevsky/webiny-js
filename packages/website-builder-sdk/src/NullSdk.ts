import type { IContentSdk, Page, PublicRedirect, ResolvedComponent } from "./types.js";

export class NullSdk implements IContentSdk {
    async getPage(): Promise<Page | null> {
        return null;
    }

    listPages(): Promise<Page[]> {
        return Promise.resolve([]);
    }

    listRedirects(): Promise<PublicRedirect[]> {
        return Promise.resolve([]);
    }

    registerComponent(): void {}

    resolveElement(): ResolvedComponent[] | null {
        return null;
    }
}
