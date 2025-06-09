import { type UiAtomType } from "../../index.js";
import { type EventActionHandlerMutationActionCallable } from "~/types.js";

const updateResizeValue: EventActionHandlerMutationActionCallable<UiAtomType, boolean> = (
    state,
    value
) => {
    return {
        ...state,
        isResizing: value
    };
};

export const startResizeMutation: EventActionHandlerMutationActionCallable<UiAtomType> = state => {
    return updateResizeValue(state, true);
};

export const endResizeMutation: EventActionHandlerMutationActionCallable<UiAtomType> = state => {
    return updateResizeValue(state, false);
};
