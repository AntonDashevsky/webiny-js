import { type UiAtomType } from "../../index.js";
import { type EventActionHandlerMutationActionCallable } from "~/types.js";

export const setIsNotSavingMutation: EventActionHandlerMutationActionCallable<
    UiAtomType
> = state => {
    return {
        ...state,
        isSaving: false
    };
};
