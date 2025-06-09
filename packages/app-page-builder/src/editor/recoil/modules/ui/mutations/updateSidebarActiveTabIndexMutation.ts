import { type EventActionHandlerMutationActionCallable } from "~/types.js";
import { type SidebarAtomType } from "../sidebarAtom.js";

export const updateSidebarActiveTabIndexMutation: EventActionHandlerMutationActionCallable<
    SidebarAtomType,
    number
> = (state, index) => {
    return {
        ...state,
        activeTabIndex: index
    };
};
