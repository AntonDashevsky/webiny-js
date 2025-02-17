import { SourceHandler, HandlerEvent, HandlerFactoryParams } from "~/types.js";

export const createSourceHandler = <
    TEvent = HandlerEvent,
    TParams extends HandlerFactoryParams = HandlerFactoryParams
>(
    handler: SourceHandler<TEvent, TParams>
) => {
    return handler;
};
