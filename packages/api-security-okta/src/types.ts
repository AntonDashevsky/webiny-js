import "@webiny/api-tenancy/types";
import type { SecurityContext } from "@webiny/api-security/types";
import type { TenancyContext } from "@webiny/api-tenancy/types";
import type { I18NContext } from "@webiny/api-i18n/types";

declare module "@webiny/api-tenancy/types" {
    interface TenantSettings {
        appClientId: string;
    }
}

/**
 * @internal
 */
export type Context = TenancyContext & SecurityContext & I18NContext;
