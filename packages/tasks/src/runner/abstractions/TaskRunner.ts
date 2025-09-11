import type { Context } from "~/types";
import type { ITaskEvent } from "~/handler/types";
import type { IResponseResult } from "~/response/abstractions";
import type { ITimer } from "@webiny/handler-aws";

export interface IIsCloseToTimeoutCallable {
    (seconds?: number): boolean;
}

export interface ITaskRunner<C extends Context = Context> {
    context: C;
    isCloseToTimeout: IIsCloseToTimeoutCallable;
    timer: ITimer;
    run(event: ITaskEvent): Promise<IResponseResult>;
}
