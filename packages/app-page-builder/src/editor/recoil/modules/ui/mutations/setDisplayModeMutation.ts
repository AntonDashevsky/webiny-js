import type { DisplayMode, EventActionHandlerMutationActionCallable } from "~/types";
import type { UiAtomType } from "../uiAtom";

export const setDisplayModeMutation: EventActionHandlerMutationActionCallable<
    UiAtomType,
    DisplayMode
> = (state, displayMode) => {
    return {
        ...state,
        displayMode
    };
};
