import type { Context as LambdaContext } from "@webiny/aws-sdk/types/index.js";
import { type Context as BaseContext, type Reply } from "@webiny/handler/types.js";
import { EventPlugin, type EventPluginCallableParams } from "@webiny/handler";

export interface RawEventHandlerCallableParams<Event, Context extends BaseContext>
    extends EventPluginCallableParams<Event, Context> {
    lambdaContext: LambdaContext;
}
export interface RawEventHandlerCallable<Event, Context extends BaseContext, Response> {
    (params: RawEventHandlerCallableParams<Event, Context>): Promise<Response | Reply>;
}

export class RawEventHandler<
    Event = any,
    Context extends BaseContext = BaseContext,
    Response = any
> extends EventPlugin<Event, Context, Response> {
    public constructor(cb: RawEventHandlerCallable<Event, Context, Response>) {
        /**
         * Callable is correct, TS is just having problems with the override.
         */
        // @ts-expect-error
        super(cb);
    }
}

export const createEventHandler = <
    Event = any,
    Context extends BaseContext = BaseContext,
    Response = any
>(
    cb: RawEventHandlerCallable<Event, Context, Response>
) => {
    return new RawEventHandler<Event, Context, Response>(cb);
};
