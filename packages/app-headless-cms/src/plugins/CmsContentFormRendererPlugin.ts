import type { CmsContentFormRendererPlugin as BaseCmsContentFormRendererPlugin } from "~/types.js";
import { legacyPluginToReactComponent } from "@webiny/app/utils/index.js";

export type CmsContentFormRendererPluginProps = Pick<
    BaseCmsContentFormRendererPlugin,
    "modelId" | "render"
>;

export const CmsContentFormRendererPlugin =
    legacyPluginToReactComponent<CmsContentFormRendererPluginProps>({
        pluginType: "cms-content-form-renderer",
        componentDisplayName: "CmsContentFormRendererPlugin"
    });
