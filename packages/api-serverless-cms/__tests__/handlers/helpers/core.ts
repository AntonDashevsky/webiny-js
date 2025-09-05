import { Plugin } from "@webiny/plugins/types";
import { getStorageOps, PluginCollection } from "@webiny/project-utils/testing/environment";
import { HeadlessCmsStorageOperations } from "@webiny/api-headless-cms/types";
import { SecurityIdentity, SecurityStorageOperations } from "@webiny/api-security/types";
import apiKeyAuthentication from "@webiny/api-security/plugins/apiKeyAuthentication";
import apiKeyAuthorization from "@webiny/api-security/plugins/apiKeyAuthorization";
import i18nContext from "@webiny/api-i18n/graphql/context";
import { mockLocalesPlugins } from "@webiny/api-i18n/graphql/testing";
import { createHeadlessCmsContext, createHeadlessCmsGraphQL } from "@webiny/api-headless-cms";
import graphQLHandlerPlugins from "@webiny/handler-graphql";
import { enableBenchmarkOnEnvironmentVariable } from "./enableBenchmarkOnEnvironmentVariable";
import { createWcpContext, createWcpGraphQL } from "@webiny/api-wcp";
import { createTenancyAndSecurity } from "./tenancySecurity";
import { createPermissions, Permission } from "./permissions";
import { PathType } from "../types";
import { TenancyStorageOperations, Tenant } from "@webiny/api-tenancy/types";
import { I18NLocalesStorageOperations } from "@webiny/api-i18n/types";
import { FileManagerStorageOperations } from "@webiny/api-file-manager/types";
import { AdminUsersStorageOperations } from "@webiny/api-admin-users/types";
import createAdminUsersApp from "@webiny/api-admin-users";
import i18nPlugins from "@webiny/api-i18n/graphql";
import { createWebsockets } from "@webiny/api-websockets";
import { createRecordLocking } from "@webiny/api-record-locking";

import { createFileManagerContext, createFileManagerGraphQL } from "@webiny/api-file-manager";
import { createAco } from "@webiny/api-aco";
import { createAuditLogs } from "@webiny/api-audit-logs";
import { createAcoHcmsContext } from "@webiny/api-headless-cms-aco";
import { createHcmsTasks } from "@webiny/api-headless-cms-tasks";
import { createApwGraphQL, createApwPageBuilderContext } from "@webiny/api-apw";
import { createBackgroundTaskContext, createBackgroundTaskGraphQL } from "@webiny/tasks";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb";
import { createLogger } from "@webiny/api-log";
import { createCmsPlugins } from "../cms";
import { createTestWcpLicense } from "@webiny/wcp/testing/createTestWcpLicense";

export interface ICreateCoreParams {
    plugins?: Plugin[];
    path: PathType;
    permissions?: Permission[];
    tenant?: Pick<Tenant, "id" | "name" | "parent">;
    features?: boolean;
}

export interface ICreateCoreResult {
    plugins: PluginCollection;
    cmsStorage: HeadlessCmsStorageOperations;
    i18nStorage: I18NLocalesStorageOperations;
    fileManagerStorage: FileManagerStorageOperations;
    securityStorage: SecurityStorageOperations;
    tenancyStorage: TenancyStorageOperations;
    adminUsersStorage: AdminUsersStorageOperations;
    tenant: Pick<Tenant, "id" | "name" | "parent">;
    login: (identity?: SecurityIdentity | null) => void;
    logout: () => void;
}

export const createCore = (params: ICreateCoreParams): ICreateCoreResult => {
    const { permissions, tenant, plugins = [], features } = params;

    const documentClient = getDocumentClient();

    const cmsStorage = getStorageOps<HeadlessCmsStorageOperations>("cms");
    const i18nStorage = getStorageOps<I18NLocalesStorageOperations>("i18n");
    const fileManagerStorage = getStorageOps<FileManagerStorageOperations>("fileManager");
    const securityStorage = getStorageOps<SecurityStorageOperations>("security");
    const tenancyStorage = getStorageOps<TenancyStorageOperations>("tenancy");
    const adminUsersStorage = getStorageOps<AdminUsersStorageOperations>("adminUsers");

    const security = createTenancyAndSecurity({
        permissions: createPermissions(permissions),
        tenant
    });

    return {
        cmsStorage: cmsStorage.storageOperations,
        i18nStorage: i18nStorage.storageOperations,
        fileManagerStorage: fileManagerStorage.storageOperations,
        securityStorage: securityStorage.storageOperations,
        tenancyStorage: tenancyStorage.storageOperations,
        adminUsersStorage: adminUsersStorage.storageOperations,
        tenant: security.tenant,
        login: security.login,
        logout: security.logout,
        plugins: [
            enableBenchmarkOnEnvironmentVariable(),
            createWcpContext({
                testProjectLicense: features ? createTestWcpLicense() : undefined
            }),
            createWcpGraphQL(),
            ...cmsStorage.plugins,
            ...fileManagerStorage.plugins,
            ...securityStorage.plugins,
            ...tenancyStorage.plugins,
            ...adminUsersStorage.plugins,
            ...security.plugins,
            createLogger({
                documentClient,
                createGraphQL: true
            }),
            createAdminUsersApp({
                storageOperations: adminUsersStorage.storageOperations
            }),
            apiKeyAuthentication({ identityType: "api-key" }),
            apiKeyAuthorization({ identityType: "api-key" }),
            i18nContext(),
            i18nPlugins(),
            /**
             * We are 100% positive that storageOperations is a list of plugins, so we can safely spread it.
             */
            // @ts-expect-error
            ...i18nStorage.storageOperations,
            ...i18nStorage.plugins,
            mockLocalesPlugins(),
            createHeadlessCmsContext({
                storageOperations: cmsStorage.storageOperations
            }),
            createHeadlessCmsGraphQL(),
            ...createCmsPlugins(),
            createFileManagerContext({
                storageOperations: fileManagerStorage.storageOperations
            }),
            createFileManagerGraphQL(),
            createAco({ documentClient }),
            createAuditLogs(),
            createRecordLocking(),
            createWebsockets(),
            ...createBackgroundTaskContext(),
            ...createBackgroundTaskGraphQL(),
            createAcoHcmsContext(),
            createHcmsTasks(),
            createApwGraphQL(),
            plugins,
            graphQLHandlerPlugins()
        ]
    };
};
