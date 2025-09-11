import { TaskManagerStore } from "~/runner/TaskManagerStore";
import type { CreateLiveContextParams } from "~tests/live/context";
import { createLiveContext } from "~tests/live/context";
import type { ITask, ITaskLog } from "~/types";
import type { Context } from "~tests/types";

export interface CreateLiveStoreParams<C extends Context = Context>
    extends CreateLiveContextParams {
    task: ITask<any, any>;
    taskLog: ITaskLog;
    context?: C;
}

export const createLiveStore = async <C extends Context = Context>(
    params: CreateLiveStoreParams<C>
) => {
    const context = params.context || (await createLiveContext(params));

    const store = new TaskManagerStore({
        context,
        task: params.task,
        log: params.taskLog
    });

    return {
        store,
        context
    };
};
