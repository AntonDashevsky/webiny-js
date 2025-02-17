import { UiAtomType } from "../../index.js";
import { EventActionHandlerMutationActionCallable } from "~/types.js";

export const setIsSavingMutation: EventActionHandlerMutationActionCallable<UiAtomType> = state => {
    return {
        ...state,
        isSaving: true
    };
};
