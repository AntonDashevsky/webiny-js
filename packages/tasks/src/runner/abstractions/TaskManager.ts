import { IResponseResult } from "~/response/abstractions/index.js";
import { ITask, ITaskDataInput, ITaskDefinition } from "~/types.js";

export interface ITaskManager<T = ITaskDataInput> {
    run: (definition: ITaskDefinition, task: ITask<T>) => Promise<IResponseResult>;
}
