import { SecurityContext } from "@webiny/api-security/types.js";
import { TenancyContext } from "@webiny/api-tenancy/types.js";
import { I18NContext } from "@webiny/api-i18n/types.js";
import { AdminUsersContext } from "@webiny/api-admin-users/types.js";

export type CoreContext = TenancyContext & SecurityContext & I18NContext & AdminUsersContext;
