import { createHandlerClientPlugin } from "./handlerClient.js";
import { Context } from "@webiny/handler/types.js";

export const registerDefaultPlugins = (context: Context): void => {
    context.plugins.register([createHandlerClientPlugin()]);
};
