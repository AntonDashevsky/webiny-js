import { createGraphQLSchema } from "~/graphql/schema.js";
import { ContextPlugin } from "@webiny/api";
import { Context } from "~/types.js";
import { createRecordLockingCrud } from "~/crud/crud.js";
import { createLockingModel } from "~/crud/model.js";
import { isHeadlessCmsReady } from "@webiny/api-headless-cms";

export interface ICreateContextPluginParams {
    timeout?: number;
}

const createContextPlugin = (params?: ICreateContextPluginParams) => {
    const plugin = new ContextPlugin<Context>(async context => {
        if (!context.wcp.canUseRecordLocking()) {
            return;
        }

        const ready = await isHeadlessCmsReady(context);
        if (!ready) {
            return;
        }
        context.plugins.register(createLockingModel());

        context.recordLocking = await createRecordLockingCrud({
            context,
            timeout: params?.timeout
        });

        const graphQlPlugin = await createGraphQLSchema({ context });
        context.plugins.register(graphQlPlugin);
    });
    plugin.name = "context.recordLocking";

    return plugin;
};

export const createRecordLocking = (params?: ICreateContextPluginParams) => {
    return [createContextPlugin(params)];
};
