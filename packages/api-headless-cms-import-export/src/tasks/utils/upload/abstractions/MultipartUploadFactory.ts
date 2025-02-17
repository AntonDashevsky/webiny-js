import type { IMultipartUploadHandler } from "./MultipartUploadHandler.js";

export interface IMultipartUploadFactoryContinueParams {
    uploadId?: string;
}

export interface IMultipartUploadFactory {
    start(params?: IMultipartUploadFactoryContinueParams): Promise<IMultipartUploadHandler>;
}
