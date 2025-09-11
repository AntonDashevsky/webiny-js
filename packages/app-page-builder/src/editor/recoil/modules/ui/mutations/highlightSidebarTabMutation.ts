import type { SidebarAtomType } from "../sidebarAtom";
import type { EventActionHandlerMutationActionCallable } from "~/types";

export const highlightSidebarTabMutation: EventActionHandlerMutationActionCallable<
    SidebarAtomType,
    boolean
> = (state, highlight) => {
    return {
        ...state,
        highlightTab: highlight
    };
};
