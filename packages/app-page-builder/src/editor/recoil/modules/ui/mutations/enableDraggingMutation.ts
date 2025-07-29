import type { UiAtomType } from "../..";
import type { EventActionHandlerMutationActionCallable } from "~/types";

export const enableDraggingMutation: EventActionHandlerMutationActionCallable<
    UiAtomType
> = state => {
    return {
        ...state,
        isDragging: true
    };
};
