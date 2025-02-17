import {
    onChangeRequestAfterCreateHook,
    onChangeRequestAfterUpdateHook,
    onChangeRequestAfterDeleteHook
} from "./changeRequests.js";
import { onCommentAfterCreateHook } from "./comments.js";
import { onContentReviewAfterCreateHook } from "./contentReviews.js";
import {
    onWorkflowAfterCreateHook,
    onWorkflowAfterUpdateHook,
    onWorkflowAfterDeleteHook
} from "./workflows.js";

import { AuditLogsContext } from "~/types.js";

export const createApwHooks = (context: AuditLogsContext) => {
    if (!context.apw) {
        return;
    }
    onChangeRequestAfterCreateHook(context);
    onChangeRequestAfterUpdateHook(context);
    onChangeRequestAfterDeleteHook(context);
    onCommentAfterCreateHook(context);
    onContentReviewAfterCreateHook(context);
    onWorkflowAfterCreateHook(context);
    onWorkflowAfterUpdateHook(context);
    onWorkflowAfterDeleteHook(context);
};
