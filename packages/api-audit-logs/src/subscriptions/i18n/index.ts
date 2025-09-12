import {
    onLocaleAfterCreateHook,
    onLocaleAfterUpdateHook,
    onLocaleAfterDeleteHook
} from "./locales.js";

import type { AuditLogsContext } from "~/types.js";

export const createI18NHooks = (context: AuditLogsContext) => {
    onLocaleAfterCreateHook(context);
    onLocaleAfterUpdateHook(context);
    onLocaleAfterDeleteHook(context);
};
