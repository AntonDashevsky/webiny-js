import { EventActionHandlerMutationActionCallable } from "~/types.js";
import { PagePreviewDimension, UiAtomType } from "../uiAtom.js";

export const setPagePreviewDimensionMutation: EventActionHandlerMutationActionCallable<
    UiAtomType,
    PagePreviewDimension
> = (state, pagePreviewDimension) => {
    return {
        ...state,
        pagePreviewDimension
    };
};
