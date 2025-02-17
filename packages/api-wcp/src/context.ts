import { ContextPlugin } from "@webiny/api";
import { WcpContext } from "~/types.js";
import { createWcp } from "~/createWcp.js";
import { DecryptedWcpProjectLicense } from "@webiny/wcp/types.js";

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
