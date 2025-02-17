import type { ICmsAssetsZipperExecuteContinueResult } from "./CmsAssetsZipperExecuteContinueResult.js";
import type { ICmsAssetsZipperExecuteDoneResult } from "./CmsAssetsZipperExecuteDoneResult.js";
import type { ICmsAssetsZipperExecuteDoneWithoutResult } from "./CmsAssetsZipperExecuteDoneWithoutResult.js";
import type { ICmsAssetsZipperExecuteContinueWithoutResult } from "./CmsAssetsZipperExecuteContinueWithoutResult.js";
import type { IIsCloseToTimeoutCallable } from "@webiny/tasks";

export interface ICmsAssetsZipperExecuteParams {
    isCloseToTimeout: IIsCloseToTimeoutCallable;
    isAborted(): boolean;
    entryAfter: string | undefined;
    fileAfter: string | undefined;
}

export type ICmsAssetsZipperExecuteResult =
    | ICmsAssetsZipperExecuteDoneResult
    | ICmsAssetsZipperExecuteDoneWithoutResult
    | ICmsAssetsZipperExecuteContinueResult
    | ICmsAssetsZipperExecuteContinueWithoutResult;

export interface ICmsAssetsZipper {
    execute(params: ICmsAssetsZipperExecuteParams): Promise<ICmsAssetsZipperExecuteResult>;
}
