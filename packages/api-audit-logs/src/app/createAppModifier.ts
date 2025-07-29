import type { CreateAcoAppModifierCallable } from "@webiny/api-aco";
import { createAcoAppModifier as baseCreateAppModifier } from "@webiny/api-aco";
import { AUDIT_LOGS_TYPE } from "./contants";
import type { AuditLogsAcoContext } from "./types";
import type { Context } from "@webiny/handler/types";

export const createAppModifier = <T extends Context = AuditLogsAcoContext>(
    cb: CreateAcoAppModifierCallable<T>
) => {
    return baseCreateAppModifier<T>(AUDIT_LOGS_TYPE, cb);
};
