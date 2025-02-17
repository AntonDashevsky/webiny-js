import { onFileAfterCreateHook, onFileAfterUpdateHook, onFileAfterDeleteHook } from "./files.js";
import { onSettingsAfterUpdateHook } from "./settings.js";

import { AuditLogsContext } from "~/types.js";

export const createFileManagerHooks = (context: AuditLogsContext) => {
    onFileAfterCreateHook(context);
    onFileAfterUpdateHook(context);
    onFileAfterDeleteHook(context);
    onSettingsAfterUpdateHook(context);
};
