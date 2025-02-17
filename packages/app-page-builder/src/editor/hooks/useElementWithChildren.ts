import { useRecoilValue } from "recoil";
import type { Element } from "@webiny/app-page-builder-elements/types.js";
import { elementWithChildrenByIdSelector } from "~/editor/recoil/modules/index.js";

export const useElementWithChildren = (elementId: string) => {
    const element = useRecoilValue(elementWithChildrenByIdSelector(elementId));
    if (!element) {
        return null;
    }

    return element as Element;
};
