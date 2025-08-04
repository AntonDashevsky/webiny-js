import type {
    Component,
    IContentSdk,
    PublicPage,
    PublicRedirect,
    ResolvedComponent
} from "~/types";
import { environment } from "./Environment.js";
import { LiveSdk } from "./LiveSdk.js";
import { EditingSdk } from "./EditingSdk.js";
import { ComponentResolver, type ResolveElementParams } from "~/ComponentResolver";
import { PreviewSdk } from "./PreviewSdk.js";
import { componentRegistry } from "~/ComponentRegistry";
import { ApiClient } from "~/dataProviders/ApiClient";
import { DefaultDataProvider } from "~/dataProviders/DefaultDataProvider";
import type { WebsiteBuilderThemeInput } from "./types/WebsiteBuilderTheme.js";
import { Theme } from "./Theme.js";
import { viewportManager } from "./ViewportManager.js";

export type ApiConfig = {
    apiKey: string;
    apiHost: string;
    apiTenant: string;
};

export type ContentSDKConfig = ApiConfig & {
    preview?: boolean;
    theme?: WebsiteBuilderThemeInput;
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

    listRedirects(): Promise<PublicRedirect[]> {
        return this.activeSdk.listRedirects();
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
        const apiClient = new ApiClient(config.apiHost, config.apiKey, config.apiTenant);

        const dataProvider = new DefaultDataProvider({ apiClient });

        let liveSdk: IContentSdk = new LiveSdk(dataProvider);

        if (config.preview && !environment.isEditing()) {
            this.isPreview = true;
            liveSdk = new PreviewSdk(dataProvider, liveSdk);
        }

        const theme = Theme.from(config.theme ?? {});

        if (environment.isClient()) {
            viewportManager.setBreakpoints(theme.breakpoints);
        }

        let editingSdk;
        if (environment.isEditing()) {
            editingSdk = new EditingSdk(liveSdk, theme);
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

    public listRedirects(): Promise<PublicRedirect[]> {
        this.assertInitialized();
        return this.sdk.listRedirects();
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
