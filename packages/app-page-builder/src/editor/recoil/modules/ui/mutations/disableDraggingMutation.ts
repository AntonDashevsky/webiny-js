import type { UiAtomType } from "../..";
import type { EventActionHandlerMutationActionCallable } from "~/types";

export const disableDraggingMutation: EventActionHandlerMutationActionCallable<
    UiAtomType
> = state => {
    return {
        ...state,
        isDragging: false
    };
};
