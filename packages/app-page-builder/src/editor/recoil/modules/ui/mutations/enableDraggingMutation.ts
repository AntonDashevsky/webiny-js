import { UiAtomType } from "../../index.js";
import { EventActionHandlerMutationActionCallable } from "~/types.js";

export const enableDraggingMutation: EventActionHandlerMutationActionCallable<
    UiAtomType
> = state => {
    return {
        ...state,
        isDragging: true
    };
};
