import type { SNSEvent } from "@webiny/aws-sdk/types/index.js";
import { registry } from "~/registry.js";
import { createHandler, type HandlerParams } from "./index.js";
import { createSourceHandler } from "~/sourceHandler.js";

const handler = createSourceHandler<SNSEvent, HandlerParams>({
    name: "handler-aws-sns",
    canUse: event => {
        if (!Array.isArray(event.Records) || event.Records.length === 0) {
            return false;
        }
        const [record] = event.Records;
        return !!record.Sns;
    },
    handle: async ({ params, event, context }) => {
        return createHandler(params)(event, context);
    }
});

registry.register(handler);
