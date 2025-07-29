import type { CreateElementEventActionArgsType } from "./types";
import type { EventActionCallable } from "~/types";

export const createElementAction: EventActionCallable<CreateElementEventActionArgsType> = () => {
    return {
        actions: []
    };
};
