import {
    onFormAfterCreateHook,
    onFormAfterDeleteHook,
    onFormsAfterExportHook,
    onFormsAfterImportHook
} from "./forms.js";
import {
    onFormRevisionAfterCreateHook,
    onFormRevisionAfterUpdateHook,
    onFormRevisionAfterDeleteHook,
    onFormRevisionAfterPublishHook,
    onFormRevisionAfterUnpublishHook
} from "./formRevisions.js";
import { onFormSubmissionsAfterExportHook } from "./formSubmissions.js";
import { onSettingsAfterUpdateHook } from "./settings.js";
import { type AuditLogsContext } from "~/types.js";

export const createFormBuilderHooks = (context: AuditLogsContext) => {
    onFormAfterCreateHook(context);
    onFormAfterDeleteHook(context);
    onFormsAfterExportHook(context);
    onFormsAfterImportHook(context);
    onFormRevisionAfterCreateHook(context);
    onFormRevisionAfterUpdateHook(context);
    onFormRevisionAfterDeleteHook(context);
    onFormRevisionAfterPublishHook(context);
    onFormRevisionAfterUnpublishHook(context);
    onFormSubmissionsAfterExportHook(context);
    onSettingsAfterUpdateHook(context);
};
