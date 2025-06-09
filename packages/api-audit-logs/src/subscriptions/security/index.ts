import {
    onApiKeyAfterCreateHook,
    onApiKeyAfterUpdateHook,
    onApiKeyAfterDeleteHook
} from "./apiKeys.js";
import { onRoleAfterCreateHook, onRoleAfterUpdateHook, onRoleAfterDeleteHook } from "./roles.js";
import { onTeamAfterCreateHook, onTeamAfterUpdateHook, onTeamAfterDeleteHook } from "./teams.js";
import { onUserAfterCreateHook, onUserAfterUpdateHook, onUserAfterDeleteHook } from "./users.js";

import { type AuditLogsContext } from "~/types.js";

export const createSecurityHooks = (context: AuditLogsContext) => {
    onApiKeyAfterCreateHook(context);
    onApiKeyAfterUpdateHook(context);
    onApiKeyAfterDeleteHook(context);
    onRoleAfterCreateHook(context);
    onRoleAfterUpdateHook(context);
    onRoleAfterDeleteHook(context);
    onTeamAfterCreateHook(context);
    onTeamAfterUpdateHook(context);
    onTeamAfterDeleteHook(context);
    onUserAfterCreateHook(context);
    onUserAfterUpdateHook(context);
    onUserAfterDeleteHook(context);
};
