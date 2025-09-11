import { createPrivateTaskDefinition } from "@webiny/tasks";
import { DELETE_FLP_TASK_ID } from "~/flp/tasks";
import { type AcoContext, type IDeleteFlpTaskInput, type IDeleteFlpTaskParams } from "~/types";

class DeleteFlpTask {
    public init = () => {
        return createPrivateTaskDefinition<AcoContext, IDeleteFlpTaskInput>({
            id: DELETE_FLP_TASK_ID,
            title: "ACO - Delete FLP record",
            description:
                "Synchronizes the FLP catalog by deleting the FLP record based on the provided folder.",
            disableDatabaseLogs: true,
            run: async (params: IDeleteFlpTaskParams) => {
                const { response, isAborted, input, context, isCloseToTimeout } = params;

                const { DeleteFlp } = await import(
                    /* webpackChunkName: "DeleteFlp" */ "../useCases/DeleteFlp"
                );

                const useCase = new DeleteFlp(context);

                try {
                    if (isAborted()) {
                        return response.aborted();
                    } else if (isCloseToTimeout()) {
                        return response.continue(input);
                    }

                    await useCase.execute(input.folder);

                    return response.done("Task done: FLP record deleted.");
                } catch (error) {
                    return response.error(error);
                }
            }
        });
    };
}

export const deleteFlpTask = () => {
    const task = new DeleteFlpTask();
    return task.init();
};
