import { CmsContext, HeadlessCms } from "@webiny/api-headless-cms/types/index.js";
import { ApwStorageOperations } from "~/types.js";
import { createReviewerStorageOperations } from "./reviewerStorageOperations.js";
import { createWorkflowStorageOperations } from "./workflowStorageOperations.js";
import { createContentReviewStorageOperations } from "./contentReviewStorageOperations.js";
import { createChangeRequestStorageOperations } from "./changeRequestStorageOperations.js";
import { createCommentStorageOperations } from "~/storageOperations/commentStorageOperations.js";
import { createApwModels } from "./models/index.js";
import { Security } from "@webiny/api-security/types.js";

export interface CreateApwStorageOperationsParams {
    cms: HeadlessCms;
    security: Security;
    getCmsContext: () => CmsContext;
}

export const createStorageOperations = (
    params: CreateApwStorageOperationsParams
): ApwStorageOperations => {
    const context = params.getCmsContext();
    /**
     * Register Apw models.
     */
    createApwModels(context);

    return {
        ...createReviewerStorageOperations(params),
        ...createWorkflowStorageOperations(params),
        ...createContentReviewStorageOperations(params),
        ...createChangeRequestStorageOperations(params),
        ...createCommentStorageOperations(params)
    };
};
