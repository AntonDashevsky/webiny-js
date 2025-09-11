import type { ApiEndpoint, CmsContext, CmsModel } from "~/types/index.js";
import { createManageSDL } from "./createManageSDL.js";
import { createReadSDL } from "./createReadSDL.js";
import { createManageResolvers } from "./createManageResolvers.js";
import { createReadResolvers } from "./createReadResolvers.js";
import { createPreviewResolvers } from "./createPreviewResolvers.js";
import { createGraphQLSchemaPluginFromFieldPlugins } from "~/utils/getSchemaFromFieldPlugins.js";
import type { ICmsGraphQLSchemaPlugin } from "~/plugins/index.js";
import { CmsGraphQLSchemaSorterPlugin, createCmsGraphQLSchemaPlugin } from "~/plugins/index.js";
import { createFieldTypePluginRecords } from "./createFieldTypePluginRecords.js";
import { CMS_MODEL_SINGLETON_TAG } from "~/constants.js";
import { createSingularSDL } from "./createSingularSDL.js";
import { createSingularResolvers } from "./createSingularResolvers.js";

interface GenerateSchemaPluginsParams {
    context: CmsContext;
    models: CmsModel[];
}

export const generateSchemaPlugins = async (
    params: GenerateSchemaPluginsParams
): Promise<ICmsGraphQLSchemaPlugin[]> => {
    const { context, models } = params;
    const { plugins, cms } = context;

    /**
     * If type does not exist, we are not generating schema plugins for models.
     * It should not come to this point, but we check it anyways.
     */
    const { type } = cms;
    if (!type) {
        return [];
    }

    // Structure plugins for faster access
    const fieldTypePlugins = createFieldTypePluginRecords(plugins);

    const sorterPlugins = plugins.byType<CmsGraphQLSchemaSorterPlugin>(
        CmsGraphQLSchemaSorterPlugin.type
    );

    const schemaPlugins = createGraphQLSchemaPluginFromFieldPlugins({
        models,
        fieldTypePlugins,
        type
    });

    models.forEach(model => {
        if (model.tags?.includes(CMS_MODEL_SINGLETON_TAG)) {
            /**
             * We always need to send either manage or read.
             */
            const singularType: ApiEndpoint = type === "manage" ? "manage" : "read";
            const plugin = createCmsGraphQLSchemaPlugin({
                typeDefs: createSingularSDL({
                    models,
                    model,
                    fieldTypePlugins,
                    type: singularType
                }),
                resolvers: createSingularResolvers({
                    models,
                    model,
                    fieldTypePlugins,
                    type: singularType
                })
            });
            plugin.name = `headless-cms.graphql.schema.singular.${model.modelId}`;
            schemaPlugins.push(plugin);
            return;
        }
        switch (type) {
            case "manage":
                {
                    const plugin = createCmsGraphQLSchemaPlugin({
                        typeDefs: createManageSDL({
                            models,
                            model,
                            fieldTypePlugins,
                            sorterPlugins
                        }),
                        resolvers: createManageResolvers({
                            models,
                            model,
                            fieldTypePlugins
                        })
                    });
                    plugin.name = `headless-cms.graphql.schema.manage.${model.modelId}`;
                    schemaPlugins.push(plugin);
                }

                break;
            case "preview":
            case "read":
                {
                    const plugin = createCmsGraphQLSchemaPlugin({
                        typeDefs: createReadSDL({
                            models,
                            model,
                            fieldTypePlugins,
                            sorterPlugins
                        }),
                        resolvers: cms.READ
                            ? createReadResolvers({
                                  models,
                                  model,
                                  fieldTypePlugins
                              })
                            : createPreviewResolvers({
                                  models,
                                  model,
                                  fieldTypePlugins
                              })
                    });
                    plugin.name = `headless-cms.graphql.schema.${type}.${model.modelId}`;
                    schemaPlugins.push(plugin);
                }
                break;
            default:
                return;
        }
    });

    return schemaPlugins.filter(pl => !!pl.schema.typeDefs);
};
