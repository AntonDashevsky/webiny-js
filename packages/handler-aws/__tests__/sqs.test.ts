import { createHandler, createSQSEventHandler } from "~/index.js";
import { createLambdaContext } from "./mocks/lambdaContext.js";
import { createSQSEvent } from "./mocks/sqsEvent.js";
import type { SQSEvent } from "@webiny/aws-sdk/types/index.js";
import { describe, it, expect } from "vitest";

describe("sqs", () => {
    it("should create handler", async () => {
        const handler = createHandler({
            plugins: []
        });

        expect(handler).not.toBeNull();
        expect(typeof handler).toEqual("function");
    });

    it("should call handler and get an error for non-existing route", async () => {
        const handler = createHandler({
            plugins: []
        });

        let error: any;
        try {
            await handler(createSQSEvent(), createLambdaContext());
        } catch (ex) {
            error = ex;
        }

        expect(error.message).toEqual(
            "To run @webiny/handler-aws/sqs, you must have SQSEventHandler set."
        );
    });

    it("should call handler and trigger given event - raw returned", async () => {
        const sqsEvent = createSQSEvent();
        const handler = createHandler({
            plugins: [
                createSQSEventHandler<SQSEvent>(async ({ event }) => {
                    return event;
                })
            ]
        });

        const result = await handler(sqsEvent, createLambdaContext());

        expect(result).toEqual(createSQSEvent());
    });

    it("should call handler and trigger given event - reply returned", async () => {
        const sqsEvent = createSQSEvent();
        const handler = createHandler({
            plugins: [
                createSQSEventHandler<SQSEvent>(async ({ event, reply }) => {
                    return reply.send(event);
                })
            ]
        });

        const result = await handler(sqsEvent, createLambdaContext());

        expect(result).toEqual({
            body: JSON.stringify(sqsEvent),
            headers: expect.any(Object),
            isBase64Encoded: false,
            statusCode: 200
        });
    });
});
