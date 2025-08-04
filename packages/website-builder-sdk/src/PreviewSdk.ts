import type { IContentSdk, IDataProvider, PublicPage, PublicRedirect } from "~/types.js";
import { PreviewDocument } from "~/PreviewDocument";

export class PreviewSdk implements IContentSdk {
    private liveSdk: IContentSdk;
    private dataProvider: IDataProvider;

    constructor(dataProvider: IDataProvider, liveSdk: IContentSdk) {
        this.liveSdk = liveSdk;
        this.dataProvider = dataProvider;
    }

    async getPage(path: string): Promise<PublicPage | null> {
        const previewDocument = await PreviewDocument.createFromHeaders();
        if (!previewDocument.matches({ type: "page", path })) {
            return this.liveSdk.getPage(path);
        }
        return this.dataProvider.getPageById(previewDocument.getId());
    }

    async listPages(): Promise<PublicPage[]> {
        return this.liveSdk.listPages();
    }

    listRedirects(): Promise<PublicRedirect[]> {
        return this.liveSdk.listRedirects();
    }
}
