import type { TenancyContext } from "@webiny/api-tenancy/types";
import type { Context as BaseContext } from "@webiny/handler/types";
import type { I18NContext } from "@webiny/api-i18n/types";
import type { SecurityContext } from "@webiny/api-security/types";
import { type GetPermissions, type SecurityIdentity } from "@webiny/api-security/types";
import type { AdminUsersContext } from "@webiny/api-admin-users/types";
import type { CmsContext } from "@webiny/api-headless-cms/types";
import { type CmsIdentity } from "@webiny/api-headless-cms/types";
import type { WbPageCrud } from "~/context/pages/pages.types";
import type { WbRedirectCrud } from "~/context/redirects/redirects.types";
import type { Context as TasksContext } from "@webiny/tasks";

export interface WbLocation {
    folderId: string;
}

export type WbIdentity = CmsIdentity;

export interface WebsiteBuilderContextObject {
    pages: WbPageCrud;
    redirects: WbRedirectCrud;
}

export interface WebsiteBuilderContext
    extends BaseContext,
        I18NContext,
        TenancyContext,
        SecurityContext,
        AdminUsersContext,
        CmsContext,
        TasksContext {
    websiteBuilder: WebsiteBuilderContextObject;
}

export interface WebsiteBuilderConfig<TStorageOperations> {
    storageOperations: TStorageOperations;
    getTenantId: () => string;
    getLocaleCode: () => string;
    getIdentity: () => SecurityIdentity;
    getPermissions: GetPermissions;
}
