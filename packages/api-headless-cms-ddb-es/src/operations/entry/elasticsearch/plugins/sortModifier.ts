import { CmsEntryElasticsearchSortModifierPlugin } from "~/plugins/index.js";
import { type PluginsContainer } from "@webiny/plugins";
import { type CmsModel } from "@webiny/api-headless-cms/types/index.js";

interface Params {
    plugins: PluginsContainer;
    model: CmsModel;
}
export const createSortModifierPluginList = ({ plugins, model }: Params) => {
    return plugins
        .byType<CmsEntryElasticsearchSortModifierPlugin>(
            CmsEntryElasticsearchSortModifierPlugin.type
        )
        .filter(pl => {
            return !pl.modelId || pl.modelId === model.modelId;
        });
};
