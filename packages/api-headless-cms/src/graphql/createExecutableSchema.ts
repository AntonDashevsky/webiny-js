import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers } from "@graphql-tools/merge";
import { ResolverDecoration } from "@webiny/handler-graphql";
import { type Resolvers, type TypeDefs } from "@webiny/handler-graphql/types.js";
import { type ICmsGraphQLSchemaPlugin } from "~/plugins/index.js";

interface Params {
    plugins: ICmsGraphQLSchemaPlugin[];
}

export const createExecutableSchema = (params: Params) => {
    const { plugins } = params;

    const typeDefs: TypeDefs[] = [];
    const resolvers: Resolvers<any>[] = [];

    const resolverDecoration = new ResolverDecoration();

    // Get schema definitions from plugins
    for (const plugin of plugins) {
        const schema = plugin.schema;
        if (schema.typeDefs) {
            typeDefs.push(schema.typeDefs);
        }
        if (schema.resolvers) {
            resolvers.push(schema.resolvers);
        }
        if (schema.resolverDecorators) {
            resolverDecoration.addDecorators(schema.resolverDecorators);
        }
    }

    return makeExecutableSchema({
        typeDefs,
        resolvers: resolverDecoration.decorateResolvers(mergeResolvers(resolvers))
    });
};
