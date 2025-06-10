import HandlerClient from "./HandlerClient.js";
import { type ClientContext } from "~/types.js";

export * from "./HandlerClientPlugin.js";

export const createHandlerClient = () => ({
    type: "context",
    name: "handler-client.context",
    async apply(context: ClientContext) {
        context.handlerClient = new HandlerClient(context);
    }
});
