import type { EventActionHandlerMutationActionCallable } from "~/types";
import type { PagePreviewDimension, UiAtomType } from "../uiAtom";

export const setPagePreviewDimensionMutation: EventActionHandlerMutationActionCallable<
    UiAtomType,
    PagePreviewDimension
> = (state, pagePreviewDimension) => {
    return {
        ...state,
        pagePreviewDimension
    };
};
