import type { ITaskRunner } from "~/runner/abstractions";
import type { IResponse, IResponseResult } from "~/response/abstractions";
import type { Context } from "~/types";
import type { ITaskEvent } from "~/handler/types";

export interface ITaskControl {
    runner: ITaskRunner;
    response: IResponse;
    context: Context;

    run(event: ITaskEvent): Promise<IResponseResult>;
}
