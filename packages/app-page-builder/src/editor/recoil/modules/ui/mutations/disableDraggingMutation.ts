import { UiAtomType } from "../../index.js";
import { EventActionHandlerMutationActionCallable } from "~/types.js";

export const disableDraggingMutation: EventActionHandlerMutationActionCallable<
    UiAtomType
> = state => {
    return {
        ...state,
        isDragging: false
    };
};
