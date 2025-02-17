import { WebsocketsEventRoute } from "~/handler/types.js";
import { createWebsocketsRoutePlugin } from "~/plugins/WebsocketsRoutePlugin.js";

export const createWebsocketsRouteDisconnectPlugin = () => {
    const plugin = createWebsocketsRoutePlugin(WebsocketsEventRoute.disconnect, async params => {
        const { registry, event, response } = params;
        await registry.unregister({
            connectionId: event.requestContext.connectionId
        });

        return response.ok();
    });
    plugin.name = "websockets.route.disconnect.default";
    return plugin;
};
