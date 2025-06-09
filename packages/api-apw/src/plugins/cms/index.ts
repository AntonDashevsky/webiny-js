import { type AdvancedPublishingWorkflow } from "~/types.js";
import { apwEntryPlugins } from "./apwEntryPlugins.js";
import { linkContentReviewToEntry } from "./linkContentReviewToEntry.js";
import { linkWorkflowToEntry } from "./linkWorkflowToEntry.js";
import { triggerContentReview } from "./triggerContentReview.js";
import { updateContentReviewStatus } from "./updateContentReviewStatus.js";
import { type HeadlessCms } from "@webiny/api-headless-cms/types/index.js";
import { type Security } from "@webiny/api-security/types.js";
import { type PluginsContainer } from "@webiny/plugins";
import { CmsEntryApwSettingsGetterPlugin } from "./CmsEntryApwSettingsGetterPlugin.js";
import { createCommentNotification } from "./notifications/commentNotification.js";
import { createContentUrlPlugin } from "./notifications/contentUrl.js";
import { createChangeRequestNotification } from "./notifications/changeRequestNotification.js";
import { createContentReviewNotification } from "./notifications/contentReviewNotification.js";

interface ApwCmsHooksParams {
    apw: AdvancedPublishingWorkflow;
    cms: HeadlessCms;
    plugins: PluginsContainer;
    security: Security;
}
export const apwCmsHooks = (params: ApwCmsHooksParams) => {
    /**
     * We do not need to assign anything if no apw or cms in the context.
     * This might happen on options request.
     */
    if (!params.apw || !params.cms) {
        return;
    }

    params.plugins.register([
        new CmsEntryApwSettingsGetterPlugin(),
        createCommentNotification(),
        createChangeRequestNotification(),
        createContentUrlPlugin(),
        createContentReviewNotification()
    ]);

    apwEntryPlugins(params);

    linkContentReviewToEntry(params);

    linkWorkflowToEntry(params);

    triggerContentReview(params);

    updateContentReviewStatus(params);
};
