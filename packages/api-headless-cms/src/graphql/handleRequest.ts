import { type ApiEndpoint, type CmsContext } from "~/types/index.js";
import { checkEndpointAccess } from "./checkEndpointAccess.js";
import { createRequestBody } from "./createRequestBody.js";
import { formatErrorPayload } from "./formatErrorPayload.js";
import { getSchema } from "./getSchema.js";
import { type Reply, type Request } from "@webiny/handler/types.js";
import { processRequestBody } from "@webiny/handler-graphql";
import { type ExecutionResult } from "graphql";

export interface HandleRequestParams {
    context: CmsContext;
    request: Request;
    reply: Reply;
}

export interface HandleRequest {
    (params: HandleRequestParams): Promise<Reply>;
}

export const handleRequest: HandleRequest = async params => {
    const { context, request, reply } = params;
    try {
        await checkEndpointAccess(context);
    } catch (ex) {
        return reply.code(401).send({
            data: null,
            error: {
                message: ex.message || "Not authorized!",
                code: ex.code || "SECURITY_NOT_AUTHORIZED",
                data: ex.data || null,
                stack: null
            }
        });
    }

    const getTenant = () => {
        return context.tenancy.getCurrentTenant();
    };

    const getLocale = () => {
        return context.cms.getLocale();
    };

    const schema = await context.benchmark.measure("headlessCms.graphql.getSchema", async () => {
        try {
            return await getSchema({
                context,
                getTenant,
                getLocale,
                type: context.cms.type as ApiEndpoint
            });
        } catch (ex) {
            console.error(`Error while generating the schema.`);
            console.error(formatErrorPayload(ex));
            throw ex;
        }
    });

    const body = await context.benchmark.measure(
        "headlessCms.graphql.createRequestBody",
        async () => {
            try {
                return createRequestBody(request.body);
            } catch (ex) {
                console.error(`Error while creating the body request.`);
                console.error(formatErrorPayload(ex));
                throw ex;
            }
        }
    );

    /**
     * We need to store the processRequestBody result in a variable and output it after the measurement.
     * Otherwise, the measurement will not be shown in the output.
     */
    let result: ExecutionResult[] | ExecutionResult | null = null;

    await context.benchmark.measure("headlessCms.graphql.processRequestBody", async () => {
        try {
            result = await processRequestBody(body, schema, context);
        } catch (ex) {
            console.error(`Error while processing the body request.`);
            console.error(formatErrorPayload(ex));
            throw ex;
        }
    });
    /**
     * IMPORTANT! Do not send anything if reply was already sent.
     */
    if (reply.sent) {
        console.warn("Reply already sent, cannot send the result (api-headless-cms).");
        return reply;
    }

    return reply.send(result);
};
