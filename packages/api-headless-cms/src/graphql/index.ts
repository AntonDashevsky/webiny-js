import type { Plugin } from "@webiny/plugins/types";
import { createSystemSchemaPlugin } from "./system";
import type { GraphQLHandlerFactoryParams } from "./graphQLHandlerFactory";
import { graphQLHandlerFactory } from "./graphQLHandlerFactory";
import { createBaseSchema } from "~/graphql/schema/baseSchema";

export type CreateGraphQLParams = GraphQLHandlerFactoryParams;
export const createGraphQL = (params: CreateGraphQLParams): Plugin[] => {
    return [createBaseSchema(), createSystemSchemaPlugin(), ...graphQLHandlerFactory(params)];
};
