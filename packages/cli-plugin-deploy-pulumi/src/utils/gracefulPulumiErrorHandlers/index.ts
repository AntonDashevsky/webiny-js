import {
    pendingOperationsInfo,
    IPendingOperationsInfoParamsContext
} from "./pendingOperationsInfo.js";
import { ddbPutItemConditionalCheckFailed } from "./ddbPutItemConditionalCheckFailed.js";
import { missingFilesInBuild } from "./missingFilesInBuild.js";

export interface Context extends IPendingOperationsInfoParamsContext {}

export const gracefulPulumiErrorHandlers = [
    ddbPutItemConditionalCheckFailed,
    missingFilesInBuild,
    pendingOperationsInfo
];
