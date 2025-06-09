import { type RenderEvent } from "@webiny/api-prerendering-service/types.js";
import plugin, { type Params } from "@webiny/api-prerendering-service/flush/index.js";
import { createEventBridgeEventHandler } from "@webiny/handler-aws";

export default (params: Params) => {
    const flush = plugin(params);

    return createEventBridgeEventHandler<"FlushPages", RenderEvent | RenderEvent[]>(
        async params => {
            const { payload, reply } = params;
            if (payload["detail-type"] !== "FlushPages") {
                return reply.send({});
            }

            return flush.cb({
                ...params,
                payload: payload.detail
            });
        }
    );
};
