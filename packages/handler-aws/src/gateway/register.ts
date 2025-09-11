import type { APIGatewayEvent } from "@webiny/aws-sdk/types/index.js";
import { registry } from "~/registry.js";
import { createSourceHandler } from "~/sourceHandler.js";
import type { HandlerParams } from "./index.js";
import { createHandler } from "./index.js";

const handler = createSourceHandler<APIGatewayEvent, HandlerParams>({
    name: "handler-aws-api-gateway",
    canUse: event => {
        return !!event.httpMethod;
    },
    handle: async ({ params, event, context }) => {
        return createHandler(params)(event, context);
    }
});

registry.register(handler);
