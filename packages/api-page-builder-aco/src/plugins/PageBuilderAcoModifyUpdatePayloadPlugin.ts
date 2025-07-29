import type { PluginsContainer } from "@webiny/plugins";
import { Plugin } from "@webiny/plugins";
import type { PbUpdatePayload } from "~/types";
import type { Page } from "@webiny/api-page-builder/types";

interface ModifyPayloadParams<T extends PbUpdatePayload = PbUpdatePayload, P extends Page = Page> {
    plugins: PluginsContainer;
    payload: T;
    page: P;
}

export interface PageBuilderAcoModifyUpdatePayloadPluginCallable<
    T extends PbUpdatePayload = PbUpdatePayload,
    P extends Page = Page
> {
    (params: ModifyPayloadParams<T, P>): Promise<void>;
}

export class PageBuilderAcoModifyUpdatePayloadPlugin<
    T extends PbUpdatePayload = PbUpdatePayload,
    P extends Page = Page
> extends Plugin {
    public static override readonly type = "pb.aco.modifyUpdatePayload";

    private readonly cb: PageBuilderAcoModifyUpdatePayloadPluginCallable<T, P>;

    public constructor(cb: PageBuilderAcoModifyUpdatePayloadPluginCallable<T, P>) {
        super();
        this.cb = cb;
    }

    public async modifyPayload(params: ModifyPayloadParams<T, P>): Promise<void> {
        await this.cb(params);
    }
}
