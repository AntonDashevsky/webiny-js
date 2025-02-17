import { SidebarAtomType } from "../sidebarAtom.js";
import { EventActionHandlerMutationActionCallable } from "~/types.js";

export const highlightSidebarTabMutation: EventActionHandlerMutationActionCallable<
    SidebarAtomType,
    boolean
> = (state, highlight) => {
    return {
        ...state,
        highlightTab: highlight
    };
};
