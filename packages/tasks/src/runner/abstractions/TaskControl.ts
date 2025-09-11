import type { ITaskRunner } from "~/runner/abstractions/index.js";
import type { IResponse, IResponseResult } from "~/response/abstractions/index.js";
import type { Context } from "~/types.js";
import type { ITaskEvent } from "~/handler/types.js";

export interface ITaskControl {
    runner: ITaskRunner;
    response: IResponse;
    context: Context;

    run(event: ITaskEvent): Promise<IResponseResult>;
}
