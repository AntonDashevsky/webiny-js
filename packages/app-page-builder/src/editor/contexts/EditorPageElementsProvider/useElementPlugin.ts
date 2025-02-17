import { plugins } from "@webiny/plugins";
import { PbEditorPageElementPlugin } from "~/types.js";
import { Element } from "@webiny/app-page-builder-elements/types.js";
import { useMemo } from "react";

export const useElementPlugin = (element: Element) => {
    return useMemo(() => {
        return plugins
            .byType<PbEditorPageElementPlugin>("pb-editor-page-element")
            .find(item => item.elementType === element.type);
    }, [element]);
};
