import { type SidebarAtomType } from "../sidebarAtom.js";
import { type EventActionHandlerMutationActionCallable } from "~/types.js";

export const highlightSidebarTabMutation: EventActionHandlerMutationActionCallable<
    SidebarAtomType,
    boolean
> = (state, highlight) => {
    return {
        ...state,
        highlightTab: highlight
    };
};
