import type { IResponseBaseResult } from "~/response/abstractions/ResponseBaseResult";
import type { TaskResponseStatus } from "~/types";

export interface IResponseAbortedResult extends IResponseBaseResult {
    status: TaskResponseStatus.ABORTED;
}
