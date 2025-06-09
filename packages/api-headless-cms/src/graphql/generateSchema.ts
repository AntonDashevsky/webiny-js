import { type CmsContext, type CmsModel } from "~/types/index.js";
import { buildSchemaPlugins } from "./buildSchemaPlugins.js";
import { createExecutableSchema } from "./createExecutableSchema.js";
import { type GraphQLSchema } from "graphql/type/index.js";
import { CmsGraphQLSchemaPlugin, type ICmsGraphQLSchemaPlugin } from "~/plugins/index.js";

interface GenerateSchemaParams {
    context: CmsContext;
    models: CmsModel[];
}
export const generateSchema = async (params: GenerateSchemaParams): Promise<GraphQLSchema> => {
    const { context, models } = params;

    let generatedSchemaPlugins: ICmsGraphQLSchemaPlugin[] = [];
    try {
        generatedSchemaPlugins = await buildSchemaPlugins({ context, models });
    } catch (ex) {
        console.log(`Error while building schema plugins.`);
        throw ex;
    }

    context.plugins.register(generatedSchemaPlugins);

    const schemaPlugins = context.plugins
        .byType<ICmsGraphQLSchemaPlugin>(CmsGraphQLSchemaPlugin.type)
        .filter(pl => {
            if (typeof pl.isApplicable === "function") {
                return pl.isApplicable(context);
            }
            return true;
        });

    return createExecutableSchema({
        plugins: schemaPlugins
    });
};
