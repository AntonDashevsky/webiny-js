import { onSettingsAfterUpdateHook } from "./settings.js";

import { AuditLogsContext } from "~/types.js";

export const createMailerHooks = (context: AuditLogsContext) => {
    onSettingsAfterUpdateHook(context);
};
