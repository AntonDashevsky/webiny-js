import { Context } from "~/types.js";
import { ITaskEvent } from "~/handler/types.js";
import { IResponseResult } from "~/response/abstractions/index.js";
import { ITimer } from "@webiny/handler-aws";

export interface IIsCloseToTimeoutCallable {
    (seconds?: number): boolean;
}

export interface ITaskRunner<C extends Context = Context> {
    context: C;
    isCloseToTimeout: IIsCloseToTimeoutCallable;
    timer: ITimer;
    run(event: ITaskEvent): Promise<IResponseResult>;
}
