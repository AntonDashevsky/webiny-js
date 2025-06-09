import { ContextPlugin } from "@webiny/api";
import { type ApwContext } from "~/types.js";
import { deleteCommentsAfterChangeRequest } from "./deleteCommentsAfterChangeRequest.js";
import { deleteChangeRequestsWithContentReview } from "./deleteChangeRequestsAfterContentReview.js";
import { createReviewerFromIdentity } from "./createReviewerFromIdentity.js";
import { initializeContentReviewSteps } from "./initializeContentReviewSteps.js";
import { updatePendingChangeRequestsCount } from "./updatePendingChangeRequests.js";
import { updateTotalCommentsCount, updateLatestCommentId } from "./updateTotalComments.js";
import { validateChangeRequest } from "./validateChangeRequest.js";
import { validateContentReview } from "./validateContentReview.js";
import { validateComment } from "./validateComment.js";
import { listContentReviews } from "./listContentReviews.js";
import { initializeNotifications } from "./initializeNotifications.js";

export const attachApwHooks = () =>
    /**
     * Hook into CMS events and execute business logic.
     */
    new ContextPlugin<ApwContext>(async context => {
        const { security, apw } = context;

        validateContentReview({ apw });

        validateChangeRequest({ apw });

        validateComment({ apw });

        createReviewerFromIdentity({ security, apw });

        initializeContentReviewSteps(context);

        updatePendingChangeRequestsCount({ apw });

        updateTotalCommentsCount({ apw });

        updateLatestCommentId({ apw });

        deleteCommentsAfterChangeRequest({ apw });

        deleteChangeRequestsWithContentReview({ apw });

        listContentReviews(context);

        initializeNotifications(context);
    });
