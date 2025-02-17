import { onModelAfterCreateHook, onModelAfterDeleteHook, onModelAfterUpdateHook } from "./models.js";
import { onGroupAfterCreateHook, onGroupAfterDeleteHook, onGroupAfterUpdateHook } from "./groups.js";
import {
    onEntryAfterCreateHook,
    onEntryAfterUpdateHook,
    onEntryAfterDeleteHook,
    onEntryAfterPublishHook,
    onEntryAfterUnpublishHook,
    onEntryRevisionAfterCreateHook,
    onEntryRevisionAfterDeleteHook,
    onEntryAfterRestoreFromTrashHook
} from "./entries.js";
import { AuditLogsContext } from "~/types.js";

export const createHeadlessCmsHooks = (context: AuditLogsContext) => {
    // groups
    onGroupAfterCreateHook(context);
    onGroupAfterUpdateHook(context);
    onGroupAfterDeleteHook(context);
    // models
    onModelAfterCreateHook(context);
    onModelAfterUpdateHook(context);
    onModelAfterDeleteHook(context);
    // entries
    onEntryAfterCreateHook(context);
    onEntryAfterUpdateHook(context);
    onEntryAfterDeleteHook(context);
    onEntryAfterRestoreFromTrashHook(context);
    onEntryAfterPublishHook(context);
    onEntryAfterUnpublishHook(context);
    onEntryRevisionAfterCreateHook(context);
    onEntryRevisionAfterDeleteHook(context);
};
