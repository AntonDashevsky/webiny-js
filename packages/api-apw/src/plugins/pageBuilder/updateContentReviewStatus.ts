import {
    AdvancedPublishingWorkflow,
    ApwContentReviewStatus,
    ApwOnPageBeforePublishTopicParams
} from "~/types.js";
import { INITIAL_CONTENT_REVIEW_CONTENT_SCHEDULE_META } from "~/crud/utils.js";
import { PageBuilderContextObject } from "@webiny/api-page-builder/graphql/types.js";
import { Security } from "@webiny/api-security/types.js";

interface UpdateContentReviewStatusParams {
    apw: AdvancedPublishingWorkflow;
    pageBuilder: PageBuilderContextObject;
    security: Security;
}

export const updateContentReviewStatus = (params: UpdateContentReviewStatusParams) => {
    const { apw, pageBuilder, security } = params;

    pageBuilder.onPageAfterPublish.subscribe<ApwOnPageBeforePublishTopicParams>(
        async ({ page }) => {
            const contentReviewId = page.settings.apw?.contentReviewId;
            /**
             * Bail out if there is no "content review" linked.
             */
            if (!contentReviewId) {
                return;
            }

            const contentReview = await apw.contentReview.get(contentReviewId);
            const identity = security.getIdentity();
            /**
             * If content review is "readyToBePublished set its status as "published" after page publish.
             */
            if (contentReview.reviewStatus === ApwContentReviewStatus.READY_TO_BE_PUBLISHED) {
                await apw.contentReview.update(contentReviewId, {
                    reviewStatus: ApwContentReviewStatus.PUBLISHED,
                    content: {
                        ...contentReview.content,
                        ...INITIAL_CONTENT_REVIEW_CONTENT_SCHEDULE_META,
                        publishedBy: identity.id
                    }
                });
            }
        }
    );
    pageBuilder.onPageAfterUnpublish.subscribe<ApwOnPageBeforePublishTopicParams>(
        async ({ page }) => {
            const contentReviewId = page.settings.apw?.contentReviewId;
            /**
             * Bail out if there is no "content review" linked.
             */
            if (!contentReviewId) {
                return;
            }

            const contentReview = await apw.contentReview.get(contentReviewId);
            /**
             * If content review is "published set its status as "readyToBePublished" after page unpublish.
             */

            if (contentReview.reviewStatus === ApwContentReviewStatus.PUBLISHED) {
                await apw.contentReview.update(contentReviewId, {
                    reviewStatus: ApwContentReviewStatus.READY_TO_BE_PUBLISHED,
                    content: {
                        ...contentReview.content,
                        ...INITIAL_CONTENT_REVIEW_CONTENT_SCHEDULE_META,
                        publishedBy: null
                    }
                });
            }
        }
    );
};
