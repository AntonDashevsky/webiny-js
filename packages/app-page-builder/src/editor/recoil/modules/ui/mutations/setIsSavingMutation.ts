import { type UiAtomType } from "../../index.js";
import { type EventActionHandlerMutationActionCallable } from "~/types.js";

export const setIsSavingMutation: EventActionHandlerMutationActionCallable<UiAtomType> = state => {
    return {
        ...state,
        isSaving: true
    };
};
