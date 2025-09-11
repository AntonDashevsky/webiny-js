import { plugins } from "@webiny/plugins";
import { useMemo } from "react";
import type { CmsEditorFieldRendererPlugin } from "~/types/index.js";

export function useRenderPlugins() {
    return useMemo(
        () => plugins.byType<CmsEditorFieldRendererPlugin>("cms-editor-field-renderer"),
        []
    );
}
