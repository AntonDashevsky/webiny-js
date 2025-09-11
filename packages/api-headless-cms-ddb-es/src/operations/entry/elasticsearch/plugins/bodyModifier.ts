import { CmsEntryElasticsearchBodyModifierPlugin } from "~/plugins/index.js";
import type { PluginsContainer } from "@webiny/plugins";
import type { CmsModel } from "@webiny/api-headless-cms/types/index.js";

interface Params {
    plugins: PluginsContainer;
    model: CmsModel;
}
export const createBodyModifierPluginList = ({ plugins, model }: Params) => {
    return plugins
        .byType<CmsEntryElasticsearchBodyModifierPlugin>(
            CmsEntryElasticsearchBodyModifierPlugin.type
        )
        .filter(pl => {
            return !pl.modelId || pl.modelId === model.modelId;
        });
};
