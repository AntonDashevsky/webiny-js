import { ContextPlugin } from "@webiny/api";
import type { WcpContext } from "~/types";
import { createWcp } from "~/createWcp";
import type { DecryptedWcpProjectLicense } from "@webiny/wcp/types";

export interface CreateWcpContextParams {
    testProjectLicense?: DecryptedWcpProjectLicense;
}

export const createWcpContext = (params: CreateWcpContextParams = {}) => {
    const plugin = new ContextPlugin<WcpContext>(async context => {
        context.wcp = await createWcp(params);
    });
    plugin.name = "wcp.context.create";

    return plugin;
};
