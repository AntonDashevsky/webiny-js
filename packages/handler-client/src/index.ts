import HandlerClient from "./HandlerClient";
import type { ClientContext } from "~/types";

export * from "./HandlerClientPlugin";

export const createHandlerClient = () => ({
    type: "context",
    name: "handler-client.context",
    async apply(context: ClientContext) {
        context.handlerClient = new HandlerClient(context);
    }
});
