import type { TaskResponseStatus } from "~/types";
import type { IResponseBaseResult } from "./ResponseBaseResult";
import type { GenericRecord } from "@webiny/api/types";

export interface IResponseError {
    message: string;
    code?: string | null;
    data?: GenericRecord | null;
    stack?: string;
}

export interface IResponseErrorParams {
    error: IResponseError | Error;
    tenant?: string;
    locale?: string;
    webinyTaskId?: string;
}

export interface IResponseErrorResult extends IResponseBaseResult {
    error: IResponseError;
    status: TaskResponseStatus.ERROR;
}
