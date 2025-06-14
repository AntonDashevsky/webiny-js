import { environment } from "./Environment.js";
import type { Component, IContentSdk, ResolvedComponent } from "~/sdk/types";
import { LiveSdk, type LiveSdkConfig } from "./LiveSdk.js";
import { PreviewSdk } from "./PreviewSdk.js";
import { ResolveElementParams } from "~/sdk/ComponentResolver";

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

    resolveElement(params: ResolveElementParams): ResolvedComponent[] | null {
        return this.active.resolveElement(params);
    }
}

export const contentSdk = new ContentSdk();
