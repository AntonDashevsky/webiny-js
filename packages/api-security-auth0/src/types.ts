import "@webiny/api-tenancy/types.js";
import { type SecurityContext } from "@webiny/api-security/types.js";
import { type TenancyContext } from "@webiny/api-tenancy/types.js";
import { type I18NContext } from "@webiny/api-i18n/types.js";

declare module "@webiny/api-tenancy/types.js" {
    interface TenantSettings {
        appClientId: string;
    }
}

/**
 * @internal
 */
export type Context = TenancyContext & SecurityContext & I18NContext;
