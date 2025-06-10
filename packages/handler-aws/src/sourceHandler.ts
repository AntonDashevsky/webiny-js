import { type SourceHandler, type HandlerEvent, type HandlerFactoryParams } from "~/types.js";

export const createSourceHandler = <
    TEvent = HandlerEvent,
    TParams extends HandlerFactoryParams = HandlerFactoryParams
>(
    handler: SourceHandler<TEvent, TParams>
) => {
    return handler;
};
