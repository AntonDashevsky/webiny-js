import { type CmsModel } from "@webiny/api-headless-cms/types/index.js";
import {
    type ApwReviewerStorageOperations as BaseApwReviewerStorageOperations,
    type ApwWorkflowStorageOperations as BaseApwWorkflowStorageOperations,
    type ApwContentReviewStorageOperations as BaseApwContentReviewStorageOperations,
    type ApwChangeRequestStorageOperations as BaseApwChangeRequestStorageOperations,
    type ApwCommentStorageOperations as BaseApwCommentStorageOperations
} from "~/types.js";

export interface ApwCommentStorageOperations extends BaseApwCommentStorageOperations {
    /**
     * @internal
     */
    getCommentModel(): Promise<CmsModel>;
}

export interface ApwReviewerStorageOperations extends BaseApwReviewerStorageOperations {
    /**
     * @internal
     */
    getReviewerModel(): Promise<CmsModel>;
}

export interface ApwWorkflowStorageOperations extends BaseApwWorkflowStorageOperations {
    /**
     * @internal
     */
    getWorkflowModel(): Promise<CmsModel>;
}

export interface ApwContentReviewStorageOperations extends BaseApwContentReviewStorageOperations {
    /**
     * @internal
     */
    getContentReviewModel(): Promise<CmsModel>;
}

export interface ApwChangeRequestStorageOperations extends BaseApwChangeRequestStorageOperations {
    /**
     * @internal
     */
    getChangeRequestModel(): Promise<CmsModel>;
}

export interface ApwStorageOperations
    extends ApwReviewerStorageOperations,
        ApwWorkflowStorageOperations,
        ApwContentReviewStorageOperations,
        ApwChangeRequestStorageOperations,
        ApwCommentStorageOperations {}
