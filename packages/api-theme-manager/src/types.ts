import "@webiny/api-tenancy/types.js";

declare module "@webiny/api-tenancy/types" {
    interface TenantSettings {
        themes: string[];
    }
}
