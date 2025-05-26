import { componentRegistry } from "~/sdk/ComponentRegistry.js";
import { ComponentResolver } from "~/sdk/ComponentResolver.js";
import { logger } from "~/sdk/Logger.js";
import type {
    Component,
    DocumentElement,
    IContentSdk,
    IDataProvider,
    Page,
    ResolvedComponent
} from "~/sdk/types.js";
import { NullDataProvider } from "./dataProviders/NullDataProvider.js";
import { DefaultDataProvider } from "./dataProviders/DefaultDataProvider.js";

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

    getPage(path: string): Promise<Page | null> {
        return this.dataProvider.getPage(path);
    }

    listPages(): Promise<Page[]> {
        return this.dataProvider.listPages();
    }

    registerComponent(blueprint: Component): void {
        componentRegistry.register(blueprint);
    }

    resolveElement(element: DocumentElement): ResolvedComponent | null {
        return new ComponentResolver(componentRegistry).resolve(element);
    }
}
