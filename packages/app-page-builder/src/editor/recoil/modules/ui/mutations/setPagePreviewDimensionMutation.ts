import { type EventActionHandlerMutationActionCallable } from "~/types.js";
import { type PagePreviewDimension, type UiAtomType } from "../uiAtom.js";

export const setPagePreviewDimensionMutation: EventActionHandlerMutationActionCallable<
    UiAtomType,
    PagePreviewDimension
> = (state, pagePreviewDimension) => {
    return {
        ...state,
        pagePreviewDimension
    };
};
