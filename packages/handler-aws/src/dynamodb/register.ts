import { registry } from "~/registry.js";
import type { DynamoDBStreamEvent } from "@webiny/aws-sdk/types/index.js";
import { createSourceHandler } from "~/sourceHandler.js";
import { createHandler, HandlerParams } from "~/dynamodb/index.js";

const handler = createSourceHandler<DynamoDBStreamEvent, HandlerParams>({
    name: "handler-aws-dynamodb-stream",
    canUse: event => {
        if (!Array.isArray(event.Records) || event.Records.length === 0) {
            return false;
        }
        const [record] = event.Records;
        if (typeof record.eventSource !== "string") {
            return false;
        }
        return record.eventSource.toLowerCase() === "aws:dynamodb";
    },
    handle: async ({ params, event, context }) => {
        return createHandler(params)(event, context);
    }
});

registry.register(handler);
