import type { EventBridgeEvent } from "@webiny/aws-sdk/types/index.js";
import { registry } from "~/registry.js";
import type { HandlerFactoryParams } from "~/types.js";
import { createSourceHandler } from "~/sourceHandler.js";
import { createHandler } from "~/eventBridge/index.js";

export interface HandlerParams extends HandlerFactoryParams {
    debug?: boolean;
}

const handler = createSourceHandler<EventBridgeEvent<string, string>, HandlerParams>({
    name: "handler-aws-event-bridge",
    canUse: event => {
        return !!event.source;
    },
    handle: async ({ params, event, context }) => {
        return createHandler(params)(event, context);
    }
});

registry.register(handler);
