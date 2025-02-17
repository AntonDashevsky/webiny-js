import { featureFlags } from "@webiny/feature-flags";
import { createGraphQLSchemaPlugin } from "@webiny/handler-graphql";
import { dataSourcesSchema } from "~/dataSources/graphql/schema.js";
import { dataSourcesResolvers } from "~/dataSources/graphql/resolvers.js";

export const createDataSourcesSchema = () => {
    return createGraphQLSchemaPlugin({
        typeDefs: dataSourcesSchema,
        resolvers: dataSourcesResolvers,
        isApplicable: () => {
            return featureFlags.experimentalDynamicPages === true;
        }
    });
};
