import { createHandlerClientPlugin } from "./handlerClient.js";
import type { Context } from "@webiny/handler/types.js";

export const registerDefaultPlugins = (context: Context): void => {
    context.plugins.register([createHandlerClientPlugin()]);
};
