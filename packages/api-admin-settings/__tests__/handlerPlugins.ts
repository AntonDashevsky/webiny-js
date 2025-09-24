import apiKeyAuthentication from "@webiny/api-security/plugins/apiKeyAuthentication";
import apiKeyAuthorization from "@webiny/api-security/plugins/apiKeyAuthorization";
import { createI18NContext } from "@webiny/api-i18n";
import { mockLocalesPlugins } from "@webiny/api-i18n/graphql/testing";
import type { SecurityIdentity } from "@webiny/api-security/types";
import type { Plugin, PluginCollection } from "@webiny/plugins/types";
import { getStorageOps } from "@webiny/project-utils/testing/environment";
import { createTenancyAndSecurity } from "./context/tenancySecurity";
import type { PermissionsArg } from "./context/helpers";
import { createPermissions } from "./context/helpers";
import dbPlugins from "@webiny/handler-db";
import { DynamoDbDriver } from "@webiny/db-dynamodb";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";

export interface CreateHandlerParams {
    permissions?: PermissionsArg[];
    identity?: SecurityIdentity;
    plugins?: Plugin | Plugin[] | Plugin[][] | PluginCollection;
}

export const createHandlerPlugins = (params?: CreateHandlerParams) => {
    const { permissions, identity, plugins = [] } = params || {};

    const i18nStorage = getStorageOps<any[]>("i18n");

    const documentClient = getDocumentClient();

    return [
        dbPlugins({
            table: process.env.DB_TABLE,
            driver: new DynamoDbDriver({
                documentClient
            })
        }),
        ...createTenancyAndSecurity({
            permissions: [...createPermissions(permissions)],
            identity
        }),
        apiKeyAuthentication({ identityType: "api-key" }),
        apiKeyAuthorization({ identityType: "api-key" }),
        createI18NContext(),
        ...i18nStorage.storageOperations,
        mockLocalesPlugins(),
        plugins
    ];
};
