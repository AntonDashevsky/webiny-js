import HandlerClient from "./HandlerClient.js";
import { Plugin } from "@webiny/plugins/types.js";
import { Context } from "@webiny/api/types.js";

export type InvokeArgs<TInvokeArgsPayload = any> = {
    name: string;
    payload?: TInvokeArgsPayload;
    await?: boolean;
    description?: string;
};

export type HandlerClientHandlerPlugin = Plugin & {
    type: "handler-client-handler";
    invoke: <TArgs = Record<string, any>, TResponse = Record<string, any>>(
        params: TArgs
    ) => TResponse | Promise<TResponse>;
};

export interface ClientContext extends Context {
    handlerClient: HandlerClient;
}
