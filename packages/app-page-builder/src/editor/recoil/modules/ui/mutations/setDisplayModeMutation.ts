import { DisplayMode, EventActionHandlerMutationActionCallable } from "~/types.js";
import { UiAtomType } from "../uiAtom.js";

export const setDisplayModeMutation: EventActionHandlerMutationActionCallable<
    UiAtomType,
    DisplayMode
> = (state, displayMode) => {
    return {
        ...state,
        displayMode
    };
};
