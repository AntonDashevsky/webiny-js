import { environment } from "./Environment.js";
import type {
    Component,
    DocumentBindings,
    DocumentElement,
    DocumentState,
    IContentSdk,
    ResolvedComponent
} from "~/sdk/types";
import { LiveSdk, type LiveSdkConfig } from "./LiveSdk.js";
import { PreviewSdk } from "./PreviewSdk.js";

export type ContentSDKConfig = LiveSdkConfig;

export class ContentSdk implements IContentSdk {
    private readonly live: LiveSdk;
    public preview?: PreviewSdk;
    private active: IContentSdk;

    constructor() {
        this.live = new LiveSdk();

        const isPreview = environment.isPreview() && environment.isClient();
        if (isPreview) {
            this.preview = new PreviewSdk(this.live);
            this.active = this.preview;
        } else {
            this.active = this.live;
        }
    }

    public init(config: ContentSDKConfig) {
        this.live.init(config);
        if (this.preview) {
            this.preview.init();
        }
    }

    public getPage(path: string) {
        return this.active.getPage(path);
    }

    public listPages() {
        return this.active.listPages();
    }

    registerComponent(blueprint: Component): void {
        this.active.registerComponent(blueprint);
    }

    resolveElement(
        element: DocumentElement,
        state: DocumentState,
        bindings: DocumentBindings,
        displayMode: string
    ): ResolvedComponent[] | null {
        return this.active.resolveElement(element, state, bindings, displayMode);
    }
}

export const contentSdk = new ContentSdk();
