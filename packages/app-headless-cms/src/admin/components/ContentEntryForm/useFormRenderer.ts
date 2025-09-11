import { plugins } from "@webiny/plugins";
import type { CmsContentFormRendererPlugin, CmsModel } from "@webiny/app-headless-cms-common/types/index.js";

export const useFormRenderer = (model: CmsModel) => {
    return plugins
        .byType<CmsContentFormRendererPlugin>("cms-content-form-renderer")
        .find(pl => pl.modelId === model.modelId);
};
