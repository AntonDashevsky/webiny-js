import type { Component, IContentSdk, PublicPage, ResolvedComponent } from "~/sdk/types";
import { environment } from "./Environment.js";
import { LiveSdk, type LiveSdkConfig } from "./LiveSdk.js";
import { EditingSdk } from "./EditingSdk.js";
import { ComponentResolver, ResolveElementParams } from "~/sdk/ComponentResolver";
import { PreviewSdk } from "./PreviewSdk.js";
import { componentRegistry } from "~/sdk/ComponentRegistry";
import { ApiClient } from "~/sdk/dataProviders/ApiClient";
import { DefaultDataProvider } from "~/sdk/dataProviders/DefaultDataProvider";

export type ContentSDKConfig = LiveSdkConfig & {
    preview?: boolean;
};

class InternalContentSdk implements IContentSdk {
    private activeSdk: IContentSdk;
    private editingSdk: EditingSdk | undefined;

    constructor(liveSdk: LiveSdk, editingSdk?: EditingSdk) {
        this.activeSdk = editingSdk ?? liveSdk;
        this.editingSdk = editingSdk;
    }

    getEditingSdk() {
        return this.editingSdk;
    }

    async getPage(path: string): Promise<PublicPage | null> {
        return this.activeSdk.getPage(path);
    }

    listPages(): Promise<PublicPage[]> {
        return this.activeSdk.listPages();
    }
}

export class ContentSdk implements IContentSdk {
    protected sdk?: InternalContentSdk;
    private isPreview = false;
    private lastConfig: any;

    public init(config: ContentSDKConfig, afterInit?: () => void): void {
        const configHash = JSON.stringify(config);
        if (this.lastConfig && this.lastConfig === configHash) {
            return;
        }

        this.lastConfig = configHash;
        const apiClient = new ApiClient(config.apiEndpoint, config.apiKey);

        const dataProvider = new DefaultDataProvider({ apiClient });

        let liveSdk: IContentSdk = new LiveSdk(dataProvider);

        if (config.preview && !environment.isEditing()) {
            this.isPreview = true;
            liveSdk = new PreviewSdk(dataProvider, liveSdk);
        }

        let editingSdk;
        if (environment.isEditing()) {
            editingSdk = new EditingSdk(liveSdk);
        }

        this.sdk = new InternalContentSdk(liveSdk as LiveSdk, editingSdk);

        if (typeof afterInit === "function") {
            afterInit();
        }
    }

    public getEditingSdk() {
        this.assertInitialized();
        return this.sdk.getEditingSdk();
    }

    public getPage(path: string) {
        this.assertInitialized();
        return this.sdk.getPage(path);
    }

    public listPages() {
        this.assertInitialized();
        return this.sdk.listPages();
    }

    registerComponent(blueprint: Component): void {
        this.assertInitialized();
        componentRegistry.register(blueprint);
    }

    resolveElement(params: ResolveElementParams): ResolvedComponent[] | null {
        this.assertInitialized();
        return new ComponentResolver(componentRegistry).resolve(params);
    }

    isEditing() {
        return environment.isEditing();
    }

    isPreviewing() {
        return this.isPreview;
    }

    private assertInitialized(): asserts this is this & { sdk: IContentSdk } {
        if (!this.sdk) {
            throw new Error(`ContentSdk has not been initialized!`);
        }
    }
}

export const contentSdk = new ContentSdk();
