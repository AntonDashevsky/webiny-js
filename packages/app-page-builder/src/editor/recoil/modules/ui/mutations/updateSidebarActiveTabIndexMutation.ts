import type { EventActionHandlerMutationActionCallable } from "~/types";
import type { SidebarAtomType } from "../sidebarAtom";

export const updateSidebarActiveTabIndexMutation: EventActionHandlerMutationActionCallable<
    SidebarAtomType,
    number
> = (state, index) => {
    return {
        ...state,
        activeTabIndex: index
    };
};
