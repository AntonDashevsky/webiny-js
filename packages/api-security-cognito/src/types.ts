import { type SecurityContext } from "@webiny/api-security/types.js";
import { type TenancyContext } from "@webiny/api-tenancy/types.js";
import { type I18NContext } from "@webiny/api-i18n/types.js";
import { type AdminUsersContext } from "@webiny/api-admin-users/types.js";

export type CoreContext = TenancyContext & SecurityContext & I18NContext & AdminUsersContext;
