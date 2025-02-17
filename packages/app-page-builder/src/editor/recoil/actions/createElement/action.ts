import { CreateElementEventActionArgsType } from "./types.js";
import { EventActionCallable } from "~/types.js";

export const createElementAction: EventActionCallable<CreateElementEventActionArgsType> = () => {
    return {
        actions: []
    };
};
