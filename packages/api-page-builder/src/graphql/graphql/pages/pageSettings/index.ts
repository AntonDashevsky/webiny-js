import { createPageSettingsGeneralGraphQL } from "./general.js";
import { createPageSettingsSeoGraphQL } from "./seo.js";
import { createPageSettingsSocialGraphQL } from "./social.js";
import { type GraphQLSchemaPlugin } from "@webiny/handler-graphql/types.js";

export const createPageSettingsGraphQL = (): GraphQLSchemaPlugin[] => {
    return [
        createPageSettingsGeneralGraphQL(),
        createPageSettingsSeoGraphQL(),
        createPageSettingsSocialGraphQL()
    ];
};
