import {
    onFolderAfterCreateHook,
    onFolderAfterUpdateHook,
    onFolderAfterDeleteHook
} from "./folders.js";

import { AuditLogsContext } from "~/types.js";

export const createAcoHooks = (context: AuditLogsContext) => {
    if (!context.aco) {
        return;
    }

    onFolderAfterCreateHook(context);
    onFolderAfterUpdateHook(context);
    onFolderAfterDeleteHook(context);
};
