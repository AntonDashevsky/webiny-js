import plugin, { type RenderParams } from "@webiny/api-prerendering-service/render/index.js";
import { createSQSEventHandler } from "@webiny/handler-aws";
import { type HandlerPayload } from "@webiny/api-prerendering-service/render/types.js";
import { type Context as LoggerContext } from "@webiny/api-log/types.js";

export default (params: RenderParams) => {
    const render = plugin(params);

    return createSQSEventHandler(async ({ event, context, request, reply }) => {
        const events: HandlerPayload = event.Records.map(r => JSON.parse(r.body));

        return render.cb({
            context: context as LoggerContext,
            payload: events,
            request,
            reply
        });
    });
};
