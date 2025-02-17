import { UiAtomType } from "../../index.js";
import { EventActionHandlerMutationActionCallable } from "~/types.js";

export const setIsNotSavingMutation: EventActionHandlerMutationActionCallable<
    UiAtomType
> = state => {
    return {
        ...state,
        isSaving: false
    };
};
