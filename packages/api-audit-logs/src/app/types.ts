import { type AcoContext, type IAcoApp } from "@webiny/api-aco/types.js";
import { type Context as BaseContext } from "@webiny/handler/types.js";

export interface AuditLogsAcoContext extends BaseContext, AcoContext {
    auditLogsAco: {
        app: IAcoApp;
    };
}
