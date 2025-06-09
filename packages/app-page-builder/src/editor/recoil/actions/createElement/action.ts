import { type CreateElementEventActionArgsType } from "./types.js";
import { type EventActionCallable } from "~/types.js";

export const createElementAction: EventActionCallable<CreateElementEventActionArgsType> = () => {
    return {
        actions: []
    };
};
