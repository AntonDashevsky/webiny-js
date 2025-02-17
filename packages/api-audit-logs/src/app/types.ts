import { AcoContext, IAcoApp } from "@webiny/api-aco/types.js";
import { Context as BaseContext } from "@webiny/handler/types.js";

export interface AuditLogsAcoContext extends BaseContext, AcoContext {
    auditLogsAco: {
        app: IAcoApp;
    };
}
