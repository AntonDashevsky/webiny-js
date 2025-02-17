import { IResponseBaseResult } from "~/response/abstractions/ResponseBaseResult.js";
import { TaskResponseStatus } from "~/types.js";

export interface IResponseAbortedResult extends IResponseBaseResult {
    status: TaskResponseStatus.ABORTED;
}
