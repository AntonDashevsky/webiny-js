import { useContext } from "react";
import { EventActionHandlerContext } from "../contexts/EventActionHandlerProvider.js";
import { type EventActionHandler } from "~/types.js";

export function useEventActionHandler<
    TCallableState = unknown
>(): EventActionHandler<TCallableState> {
    return useContext(EventActionHandlerContext) as EventActionHandler<TCallableState>;
}
