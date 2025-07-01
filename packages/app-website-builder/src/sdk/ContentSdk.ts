import { environment } from "./Environment.js";
import type { Component, IContentSdk, ResolvedComponent } from "~/sdk/types";
import { LiveSdk, type LiveSdkConfig } from "./LiveSdk.js";
import { EditingSdk } from "./EditingSdk.js";
import { ResolveElementParams } from "~/sdk/ComponentResolver";

export type ContentSDKConfig = LiveSdkConfig;

export class ContentSdk implements IContentSdk {
    private readonly live: LiveSdk;
    public editing?: EditingSdk;
    private active: IContentSdk;

    constructor() {
        this.live = new LiveSdk();

        const isPreview = environment.isPreview() && environment.isClient();
        if (environment.isEditing()) {
            this.editing = new EditingSdk(this.live);
            this.active = this.editing;
        } else {
            this.active = this.live;
        }
    }

    public init(config: ContentSDKConfig) {
        this.live.init(config);
        if (this.editing) {
            this.editing.init();
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
