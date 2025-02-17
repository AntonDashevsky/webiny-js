import { ITaskRunner } from "~/runner/abstractions/index.js";
import { IResponse, IResponseResult } from "~/response/abstractions/index.js";
import { Context } from "~/types.js";
import { ITaskEvent } from "~/handler/types.js";

export interface ITaskControl {
    runner: ITaskRunner;
    response: IResponse;
    context: Context;

    run(event: ITaskEvent): Promise<IResponseResult>;
}
