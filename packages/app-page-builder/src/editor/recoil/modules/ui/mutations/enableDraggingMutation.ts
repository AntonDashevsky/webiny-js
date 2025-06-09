import { type UiAtomType } from "../../index.js";
import { type EventActionHandlerMutationActionCallable } from "~/types.js";

export const enableDraggingMutation: EventActionHandlerMutationActionCallable<
    UiAtomType
> = state => {
    return {
        ...state,
        isDragging: true
    };
};
