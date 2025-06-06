import { ClientContext } from "@webiny/handler-client/types.js";
import { TenancyContext } from "@webiny/api-tenancy/types.js";
import { SecurityContext } from "@webiny/api-security/types.js";
import { I18NContext } from "@webiny/api-i18n/types.js";
import { I18NContentContext } from "@webiny/api-i18n-content/types.js";
import { PbContext } from "@webiny/api-page-builder/graphql/types.js";
import { PrerenderingServiceClientContext } from "@webiny/api-prerendering-service/client/types.js";
import { FileManagerContext } from "@webiny/api-file-manager/types.js";
import { FormBuilderContext } from "@webiny/api-form-builder/types.js";
import { CmsContext } from "@webiny/api-headless-cms/types/index.js";
import { AcoContext } from "@webiny/api-aco/types.js";
import { PbAcoContext } from "@webiny/api-page-builder-aco/types.js";
import { ContextPluginCallable, createContextPlugin as baseCreateContextPlugin } from "@webiny/api";
import {
    createGraphQLSchemaPlugin as baseCreateGraphQLSchemaPlugin,
    GraphQLSchemaPluginConfig
} from "@webiny/handler-graphql";
import { createSecurityRolePlugin, createSecurityTeamPlugin } from "@webiny/api-security";
import { MailerContext } from "@webiny/api-mailer/types.js";
import { Context as LoggerContext } from "@webiny/api-log/types.js";

export interface Context
    extends ClientContext,
        MailerContext,
        TenancyContext,
        SecurityContext,
        I18NContext,
        I18NContentContext,
        PbContext,
        PrerenderingServiceClientContext,
        FileManagerContext,
        FormBuilderContext,
        AcoContext,
        PbAcoContext,
        LoggerContext,
        CmsContext {}

export const createContextPlugin = <T extends Context = Context>(
    callable: ContextPluginCallable<T>
) => {
    return baseCreateContextPlugin<T>(callable);
};

export const createGraphQLSchemaPlugin = <T extends Context = Context>(
    config: GraphQLSchemaPluginConfig<T>
) => {
    return baseCreateGraphQLSchemaPlugin<T>(config);
};

export { createSecurityRolePlugin, createSecurityTeamPlugin };

export * from "./tenancy/InstallTenant.js";

export {
    // Model groups.
    createModelGroupPlugin,

    // Models.
    createModelPlugin,
    createSingleEntryModelPlugin,
    createPrivateModelPlugin,
    createPrivateSingleEntryModelPlugin,

    // Model fields (this is not a plugin factory, hence the missing `Plugin` suffix in the name).
    createModelField,

    // Other.
    createCmsGraphQLSchemaPlugin,
    createStorageTransformPlugin
} from "@webiny/api-headless-cms";
