import { ContextPlugin } from "@webiny/handler";
import { Context } from "~/types.js";
import { WebsocketsContext } from "./WebsocketsContext.js";
import { WebsocketsConnectionRegistry } from "~/registry/index.js";
import { WebsocketsTransport } from "~/transport/index.js";

export * from "./WebsocketsContext.js";
export * from "./abstractions/IWebsocketsContext.js";

export const createWebsocketsContext = () => {
    const plugin = new ContextPlugin<Context>(async context => {
        /**
         * TODO Find a better way to send the documentClient to the registry.
         */
        // @ts-expect-error
        const documentClient = context.db.driver.documentClient;
        const registry = new WebsocketsConnectionRegistry(documentClient);
        const transport = new WebsocketsTransport();
        context.websockets = new WebsocketsContext(registry, transport);
    });

    plugin.name = "websockets.context";

    return plugin;
};
