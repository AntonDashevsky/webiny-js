import type { UiAtomType } from "../..";
import type { EventActionHandlerMutationActionCallable } from "~/types";

export const setIsNotSavingMutation: EventActionHandlerMutationActionCallable<
    UiAtomType
> = state => {
    return {
        ...state,
        isSaving: false
    };
};
