import { createWebsocketsRouteConnectPlugin } from "./connect.js";
import { createWebsocketsRouteDefaultPlugin } from "./default.js";
import { createWebsocketsRouteDisconnectPlugin } from "./disconnect.js";

export const createWebsocketsRoutePlugins = () => {
    return [
        createWebsocketsRouteConnectPlugin(),
        createWebsocketsRouteDisconnectPlugin(),
        createWebsocketsRouteDefaultPlugin()
    ];
};
