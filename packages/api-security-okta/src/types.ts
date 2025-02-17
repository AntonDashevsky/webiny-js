import "@webiny/api-tenancy/types.js";
import { SecurityContext } from "@webiny/api-security/types.js";
import { TenancyContext } from "@webiny/api-tenancy/types.js";
import { I18NContext } from "@webiny/api-i18n/types.js";

declare module "@webiny/api-tenancy/types" {
    interface TenantSettings {
        appClientId: string;
    }
}

/**
 * @internal
 */
export type Context = TenancyContext & SecurityContext & I18NContext;
