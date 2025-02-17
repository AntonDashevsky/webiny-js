import { CmsContext, CmsModel } from "~/types/index.js";
import { createModelsSchema } from "./schema/contentModels.js";
import { createContentEntriesSchema } from "./schema/contentEntries.js";
import { createGroupsSchema } from "./schema/contentModelGroups.js";
import { createBaseContentSchema } from "./schema/baseContentSchema.js";
import { generateSchemaPlugins } from "./schema/schemaPlugins.js";
import { ICmsGraphQLSchemaPlugin } from "~/plugins/index.js";

/**
 * This factory is called whenever we need to generate graphql-schema plugins using the current context.
 */
interface BuildSchemaPluginsParams {
    context: CmsContext;
    models: CmsModel[];
}
export const buildSchemaPlugins = async (
    params: BuildSchemaPluginsParams
): Promise<ICmsGraphQLSchemaPlugin[]> => {
    return [
        // Base GQL types and scalars
        createBaseContentSchema(params),
        createModelsSchema(params),
        createContentEntriesSchema(params),
        createGroupsSchema(params),
        // Dynamic schema
        ...(await generateSchemaPlugins(params))
    ].filter(Boolean);
};
