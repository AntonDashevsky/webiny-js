import type { CmsFieldTypePlugins, CmsModelFieldToGraphQLPlugin } from "~/types/index.js";
import type { PluginsContainer } from "@webiny/plugins";

export const createFieldTypePluginRecords = (plugins: PluginsContainer) => {
    return plugins
        .byType<CmsModelFieldToGraphQLPlugin>("cms-model-field-to-graphql")
        .reduce<CmsFieldTypePlugins>((acc, pl) => {
            acc[pl.fieldType] = pl;
            return acc;
        }, {});
};
