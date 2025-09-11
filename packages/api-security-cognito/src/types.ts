import type { SecurityContext } from "@webiny/api-security/types";
import type { TenancyContext } from "@webiny/api-tenancy/types";
import type { I18NContext } from "@webiny/api-i18n/types";
import type { AdminUsersContext } from "@webiny/api-admin-users/types";

export type CoreContext = TenancyContext & SecurityContext & I18NContext & AdminUsersContext;
