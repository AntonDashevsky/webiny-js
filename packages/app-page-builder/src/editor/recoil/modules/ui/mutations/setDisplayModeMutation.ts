import { type DisplayMode, type EventActionHandlerMutationActionCallable } from "~/types.js";
import { type UiAtomType } from "../uiAtom.js";

export const setDisplayModeMutation: EventActionHandlerMutationActionCallable<
    UiAtomType,
    DisplayMode
> = (state, displayMode) => {
    return {
        ...state,
        displayMode
    };
};
