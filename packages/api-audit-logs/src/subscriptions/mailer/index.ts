import { onSettingsAfterUpdateHook } from "./settings.js";

import { type AuditLogsContext } from "~/types.js";

export const createMailerHooks = (context: AuditLogsContext) => {
    onSettingsAfterUpdateHook(context);
};
