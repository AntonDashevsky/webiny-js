import { logger } from "~/sdk/Logger.js";
import type { ResolveElementParams } from "~/sdk/ComponentResolver.js";
import type { Component, IContentSdk, Page, ResolvedComponent } from "~/sdk/types.js";
import mockPage1 from "./mocks/mockPage1";

export type PreviewSdkConfig = {
    apiKey: string;
    apiEndpoint?: string;
};

export class PreviewSdk implements IContentSdk {
    private initialized = false;
    private liveSdk: IContentSdk;

    constructor(liveSdk: IContentSdk) {
        this.liveSdk = liveSdk;
    }

    public init(config: PreviewSdkConfig) {
        if (this.initialized) {
            return;
        }

        this.initialized = true;

        logger.debug("Preview SDK initialized!");
    }

    async getPage(path: string): Promise<Page | null> {
        return mockPage1;
        // return this.liveSdk.getPage(path, { preview: true });
    }

    async listPages(): Promise<Page[]> {
        return [mockPage1]; //this.liveSdk.listPages();
    }

    registerComponent(blueprint: Component): void {
        this.liveSdk.registerComponent(blueprint);
    }

    resolveElement(params: ResolveElementParams): ResolvedComponent[] | null {
        return this.liveSdk.resolveElement(params);
    }
}
