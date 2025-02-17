/**
 * We have separated context and GraphQL creation so user can initialize only context if required.
 * GraphQL will not work without context, but context will without GraphQL.
 */
import graphql from "~/plugins/graphql.js";
import { createApwPageBuilderContext as createPageBuilder } from "./plugins/context.js";
import { CreateApwContextParams } from "./scheduler/types.js";
import { createMailerContext, createMailerGraphQL } from "@webiny/api-mailer";
import { createAdminSettingsContext } from "@webiny/api-admin-settings";

export const createApwPageBuilderContext = (params: CreateApwContextParams) => {
    return [
        ...createAdminSettingsContext(),
        ...createMailerContext(),
        ...createMailerGraphQL(),
        createPageBuilder(params)
    ];
};

export const createApwGraphQL = () => {
    return [graphql()];
};
