import type { ITaskEvent } from "~/handler/types.js";
import type { IResponseContinueParams, IResponseContinueResult } from "./ResponseContinueResult.js";
import type { IResponseDoneParams, IResponseDoneResult } from "./ResponseDoneResult.js";
import type { IResponseErrorParams, IResponseErrorResult } from "./ResponseErrorResult.js";
import type { IResponseAbortedResult } from "./ResponseAbortedResult.js";
import type { ITaskResponseDoneResultOutput } from "~/response/abstractions/TaskResponse.js";

export type IResponseFromParams =
    | IResponseDoneResult
    | IResponseContinueResult
    | IResponseErrorResult;

export type IResponseResult =
    | IResponseDoneResult
    | IResponseContinueResult
    | IResponseErrorResult
    | IResponseAbortedResult;

export interface IResponse {
    readonly event: ITaskEvent;

    setEvent: (event: ITaskEvent) => void;

    from: (params: IResponseFromParams) => IResponseResult;
    done: <O extends ITaskResponseDoneResultOutput = ITaskResponseDoneResultOutput>(
        params?: IResponseDoneParams<O>
    ) => IResponseDoneResult<O>;
    aborted: () => IResponseAbortedResult;
    continue: (params: IResponseContinueParams) => IResponseContinueResult;
    error: (params: IResponseErrorParams) => IResponseErrorResult;
}

export interface IResponseAsync {
    readonly response: IResponse;

    from: (result: IResponseResult) => Promise<IResponseResult>;
    done: (params: IResponseDoneParams) => Promise<IResponseDoneResult>;
    continue: (
        params: IResponseContinueParams
    ) => Promise<IResponseContinueResult | IResponseErrorResult>;
    aborted: () => Promise<IResponseAbortedResult>;
    error: (params: IResponseErrorParams) => Promise<IResponseErrorResult>;
}
