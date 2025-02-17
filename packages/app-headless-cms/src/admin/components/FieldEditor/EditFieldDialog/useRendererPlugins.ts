import { plugins } from "@webiny/plugins";
import { CmsModelFieldRendererPlugin } from "@webiny/app-headless-cms-common/types/index.js";
import { useModel } from "~/admin/components/ModelProvider/index.js";
import { useModelField } from "~/admin/components/ModelFieldProvider/index.js";

/**
 * We want the "hidden" renderer to always be the last one in the list.
 * @param a
 * @param b
 */
const hiddenLast = (a: CmsModelFieldRendererPlugin, b: CmsModelFieldRendererPlugin) => {
    if (a.renderer.rendererName === "hidden") {
        return 1;
    }

    if (b.renderer.rendererName === "hidden") {
        return -1;
    }

    return 0;
};

export const useRendererPlugins = () => {
    const { model } = useModel();
    const { field, fieldPlugin } = useModelField();

    return plugins
        .byType<CmsModelFieldRendererPlugin>("cms-editor-field-renderer")
        .filter(item => item.renderer.canUse({ field, fieldPlugin, model }))
        .sort(hiddenLast);
};
