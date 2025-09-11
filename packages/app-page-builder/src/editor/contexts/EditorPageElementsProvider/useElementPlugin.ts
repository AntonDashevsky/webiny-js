import { plugins } from "@webiny/plugins";
import type { PbEditorPageElementPlugin } from "~/types";
import type { Element } from "@webiny/app-page-builder-elements/types";
import { useMemo } from "react";

export const useElementPlugin = (element: Element) => {
    return useMemo(() => {
        return plugins
            .byType<PbEditorPageElementPlugin>("pb-editor-page-element")
            .find(item => item.elementType === element.type);
    }, [element]);
};
