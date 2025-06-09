import { type UiAtomType } from "../../index.js";
import { type EventActionHandlerMutationActionCallable } from "~/types.js";

export const disableDraggingMutation: EventActionHandlerMutationActionCallable<
    UiAtomType
> = state => {
    return {
        ...state,
        isDragging: false
    };
};
