import { type IImportPagesControllerTaskParams, PageImportTask } from "~/import/pages/types.js";
import { type ITaskResponseResult, TaskDataStatus } from "@webiny/tasks";

export const PROCESS_PAGES_WAIT_TIME = 5; // seconds

export class ImportPagesProcessPagesChecker {
    public async execute(params: IImportPagesControllerTaskParams): Promise<ITaskResponseResult> {
        const { response, context, store } = params;

        const { items } = await context.tasks.listTasks({
            where: {
                parentId: store.getTask().id,
                definitionId: PageImportTask.Process,
                taskStatus_in: [TaskDataStatus.RUNNING, TaskDataStatus.PENDING]
            },
            limit: 1
        });
        if (items.length > 0) {
            return response.continue(
                {
                    ...params.input
                },
                {
                    seconds: PROCESS_PAGES_WAIT_TIME
                }
            );
        }
        return response.done();
    }
}
