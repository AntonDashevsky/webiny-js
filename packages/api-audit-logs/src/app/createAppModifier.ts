import {
    createAcoAppModifier as baseCreateAppModifier,
    CreateAcoAppModifierCallable
} from "@webiny/api-aco";
import { AUDIT_LOGS_TYPE } from "./contants.js";
import { AuditLogsAcoContext } from "./types.js";
import { Context } from "@webiny/handler/types.js";

export const createAppModifier = <T extends Context = AuditLogsAcoContext>(
    cb: CreateAcoAppModifierCallable<T>
) => {
    return baseCreateAppModifier<T>(AUDIT_LOGS_TYPE, cb);
};
