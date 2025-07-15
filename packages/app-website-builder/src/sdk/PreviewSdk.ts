import type { IContentSdk, IDataProvider, PublicPage } from "~/sdk/types.js";
import { PreviewDocument } from "~/sdk/PreviewDocument";

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
}
