import { createCrud, type CreateCrudParams } from "./crud.js";
import graphql from "./graphql.js";
import { createTranslations, createTranslationsGraphQl } from "~/translations/createTranslations.js";
import { type PluginCollection } from "@webiny/plugins/types.js";
import { createDataSourcesContext } from "~/dataSources/context/createDataSourcesContext.js";
import { createDataSourcesSchema } from "~/dataSources/graphql/createDataSourcesSchema.js";

export const createPageBuilderGraphQL = (): PluginCollection => {
    return [...graphql(), ...createTranslationsGraphQl(), createDataSourcesSchema()];
};

export type ContextParams = CreateCrudParams;
export const createPageBuilderContext = (params: ContextParams) => {
    return [createCrud(params), ...createTranslations(), createDataSourcesContext()];
};

export * from "./crud/pages/PageContent.js";
export * from "./crud/pages/PageElementId.js";
