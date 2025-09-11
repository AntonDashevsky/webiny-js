import type { UiAtomType } from "../..";
import type { EventActionHandlerMutationActionCallable } from "~/types";

export const setIsSavingMutation: EventActionHandlerMutationActionCallable<UiAtomType> = state => {
    return {
        ...state,
        isSaving: true
    };
};
