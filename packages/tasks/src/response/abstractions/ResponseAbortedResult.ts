import type { IResponseBaseResult } from "~/response/abstractions/ResponseBaseResult.js";
import type { TaskResponseStatus } from "~/types.js";

export interface IResponseAbortedResult extends IResponseBaseResult {
    status: TaskResponseStatus.ABORTED;
}
