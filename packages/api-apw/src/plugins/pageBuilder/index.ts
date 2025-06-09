import { type Security } from "@webiny/api-security/types.js";
import { type PageBuilderContextObject } from "@webiny/api-page-builder/graphql/types.js";
import { type AdvancedPublishingWorkflow } from "~/types.js";
import { triggerContentReview } from "./triggerContentReview.js";
import { linkContentReviewToPage } from "./linkContentReviewToPage.js";
import { updateContentReviewStatus } from "./updateContentReviewStatus.js";
import { linkWorkflowToPage } from "./linkWorkflowToPage.js";
import { type PluginsContainer } from "@webiny/plugins";
import { PageApwSettingsGetterPlugin } from "~/plugins/pageBuilder/PageApwSettingsGetterPlugin.js";
import { createCommentNotification } from "./notifications/commentNotification.js";
import { createContentUrlPlugin } from "./notifications/contentUrl.js";
import { createChangeRequestNotification } from "./notifications/changeRequestNotification.js";
import { createContentReviewNotification } from "./notifications/contentReviewNotification.js";

export interface ApwPageBuilderPluginsParams {
    pageBuilder: PageBuilderContextObject;
    apw: AdvancedPublishingWorkflow;
    security: Security;
    plugins: PluginsContainer;
}

export const apwPageBuilderHooks = (params: ApwPageBuilderPluginsParams) => {
    const { pageBuilder, apw, security, plugins } = params;

    plugins.register([
        new PageApwSettingsGetterPlugin(),
        createCommentNotification(),
        createChangeRequestNotification(),
        createContentUrlPlugin(),
        createContentReviewNotification()
    ]);

    triggerContentReview({
        apw,
        pageBuilder
    });
    linkContentReviewToPage({
        apw,
        pageBuilder
    });
    updateContentReviewStatus({
        apw,
        pageBuilder,
        security
    });
    linkWorkflowToPage({
        apw,
        pageBuilder
    });
};
