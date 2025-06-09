import { createFormBuilderHooks } from "./formBuilder/index.js";
import { createPageBuilderHooks } from "./pageBuilder/index.js";
import { createFileManagerHooks } from "./fileManager/index.js";
import { createHeadlessCmsHooks } from "./headlessCms/index.js";
import { createSecurityHooks } from "./security/index.js";
import { createI18NHooks } from "./i18n/index.js";
import { createMailerHooks } from "./mailer/index.js";
import { createAcoHooks } from "./aco/index.js";
import { createApwHooks } from "./apw/index.js";
import { type AuditLogsContext } from "~/types.js";

export const createSubscriptionHooks = (context: AuditLogsContext) => {
    createFormBuilderHooks(context);
    createPageBuilderHooks(context);
    createFileManagerHooks(context);
    createHeadlessCmsHooks(context);
    createSecurityHooks(context);
    createI18NHooks(context);
    createMailerHooks(context);
    createAcoHooks(context);
    context.wcp.canUseFeature("advancedPublishingWorkflow") && createApwHooks(context);
};
