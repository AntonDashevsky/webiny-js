import { type Context } from "@webiny/handler/types.js";

export interface TenantManagerContext extends Context {
    tenantManager: boolean;
}
