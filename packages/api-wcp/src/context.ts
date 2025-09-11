import { ContextPlugin } from "@webiny/api";
import type { WcpContext } from "~/types.js";
import { createWcp } from "~/createWcp.js";
import type { DecryptedWcpProjectLicense } from "@webiny/wcp/types.js";
import { GetProject } from "~/features/GetProject/feature.js";

export interface CreateWcpContextParams {
    testProjectLicense?: DecryptedWcpProjectLicense;
}

export const createWcpContext = (params: CreateWcpContextParams = {}) => {
    const plugin = new ContextPlugin<WcpContext>(async context => {
        context.wcp = await createWcp(params);

        GetProject.register(context.container, context);
    });
    plugin.name = "wcp.context.create";

    return plugin;
};
