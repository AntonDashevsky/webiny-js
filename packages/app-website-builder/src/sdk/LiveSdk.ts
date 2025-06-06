import { componentRegistry } from "~/sdk/ComponentRegistry.js";
import { ComponentResolver } from "~/sdk/ComponentResolver.js";
import { logger } from "~/sdk/Logger.js";
import type {
    Component,
    DocumentBindings,
    DocumentElement,
    DocumentState,
    IContentSdk,
    IDataProvider,
    Page,
    ResolvedComponent
} from "~/sdk/types.js";
import { NullDataProvider } from "./dataProviders/NullDataProvider.js";
import { DefaultDataProvider } from "./dataProviders/DefaultDataProvider.js";
import { documentStoreManager } from "~/sdk/DocumentStoreManager";

export type LiveSdkConfig = {
    apiKey: string;
    apiEndpoint?: string;
};

export class LiveSdk implements IContentSdk {
    private initialized = false;
    private apiKey = "";
    private apiEndpoint = "/api/pages";
    private dataProvider: IDataProvider = new NullDataProvider();

    public init(config: LiveSdkConfig) {
        if (this.initialized) {
            return;
        }

        this.apiKey = config.apiKey;
        this.apiEndpoint = config.apiEndpoint || "/api/pages";

        this.dataProvider = new DefaultDataProvider({
            apiKey: this.apiKey,
            apiEndpoint: this.apiEndpoint
        });

        this.initialized = true;

        logger.debug("Live SDK initialized!");
    }

    async getPage(path: string): Promise<Page | null> {
        const page = await this.dataProvider.getPage(path);
        if (page) {
            documentStoreManager.getStore(page.properties.id).setDocument(page);
        }
        return page;
    }

    listPages(): Promise<Page[]> {
        return this.dataProvider.listPages();
    }

    registerComponent(blueprint: Component): void {
        componentRegistry.register(blueprint);
    }

    resolveElement(
        element: DocumentElement,
        state: DocumentState,
        bindings: DocumentBindings,
        displayMode: string
    ): ResolvedComponent[] | null {
        return new ComponentResolver(componentRegistry).resolve(
            element,
            state,
            bindings,
            displayMode
        );
    }
}
