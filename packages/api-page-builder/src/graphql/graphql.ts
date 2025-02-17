import { createBaseGraphQL } from "./graphql/base.gql.js";
import { createMenuGraphQL } from "./graphql/menus.gql.js";
import { createPageGraphQL } from "./graphql/pages.gql.js";
import { createPageElementsGraphQL } from "./graphql/pageElements.gql.js";
import { createCategoryGraphQL } from "./graphql/categories.gql.js";
import { createSettingsGraphQL } from "./graphql/settings.gql.js";
import { createInstallGraphQL } from "./graphql/install.gql.js";
import { createBlockCategoryGraphQL } from "./graphql/blockCategories.gql.js";
import { createPageBlockGraphQL } from "./graphql/pageBlocks.gql.js";
import { createPageTemplateGraphQL } from "./graphql/pageTemplates.gql.js";

import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/types.js";
import { createDynamicDataSchema } from "~/graphql/graphql/dynamicData.gql.js";

export default () => {
    return [
        createBaseGraphQL(),
        createDynamicDataSchema(),
        createMenuGraphQL(),
        createCategoryGraphQL(),
        createPageGraphQL(),
        createPageElementsGraphQL(),
        createSettingsGraphQL(),
        createBlockCategoryGraphQL(),
        createInstallGraphQL(),
        createPageBlockGraphQL,
        createPageTemplateGraphQL
    ] as GraphQLSchemaPlugin[];
};
