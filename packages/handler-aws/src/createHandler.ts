import { AsyncPluginsContainer } from "@webiny/plugins";
import { type HandlerFactory } from "~/types.js";
import { registry } from "./registry.js";

export const createHandler: HandlerFactory = ({ plugins, ...params }) => {
    const pluginsContainer = new AsyncPluginsContainer(plugins);

    return async (event, context) => {
        const plugins = await pluginsContainer.init();
        const handler = registry.getHandler(event, context);
        return handler.handle({
            params: {
                ...params,
                plugins
            },
            event,
            context
        });
    };
};
