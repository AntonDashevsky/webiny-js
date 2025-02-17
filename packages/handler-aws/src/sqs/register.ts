import type { SQSEvent } from "@webiny/aws-sdk/types/index.js";
import { registry } from "~/registry.js";
import { createHandler, HandlerParams } from "./index.js";
import { createSourceHandler } from "~/sourceHandler.js";

const handler = createSourceHandler<SQSEvent, HandlerParams>({
    name: "handler-aws-sqs",
    canUse: event => {
        if (!Array.isArray(event.Records) || event.Records.length === 0) {
            return false;
        }
        const [record] = event.Records;
        if (typeof record.eventSource !== "string") {
            return false;
        }
        return record.eventSource.toLowerCase() === "aws:sqs";
    },
    handle: async ({ params, event, context }) => {
        return createHandler(params)(event, context);
    }
});

registry.register(handler);
