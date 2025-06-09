import {
    createAcoAppModifier as baseCreateAppModifier,
    type CreateAcoAppModifierCallable
} from "@webiny/api-aco";
import { AUDIT_LOGS_TYPE } from "./contants.js";
import { type AuditLogsAcoContext } from "./types.js";
import { type Context } from "@webiny/handler/types.js";

export const createAppModifier = <T extends Context = AuditLogsAcoContext>(
    cb: CreateAcoAppModifierCallable<T>
) => {
    return baseCreateAppModifier<T>(AUDIT_LOGS_TYPE, cb);
};
