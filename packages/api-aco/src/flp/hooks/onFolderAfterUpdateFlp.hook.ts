import WebinyError from "@webiny/error";
import { type AcoContext, type IUpdateFlpTaskInput } from "~/types.js";
import { UPDATE_FLP_TASK_ID } from "../tasks/index.js";
import { UpdateFlp } from "~/flp/useCases/index.js";

export const onFolderAfterUpdateFlpHook = (context: AcoContext) => {
    context.aco.folder.onFolderAfterUpdate.subscribe(async ({ folder }) => {
        try {
            if (!context.tasks) {
                const useCase = new UpdateFlp({ context });
                await useCase.execute(folder);
                return;
            }

            await context.tasks.trigger<IUpdateFlpTaskInput>({
                definition: UPDATE_FLP_TASK_ID,
                input: {
                    folder
                }
            });
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while executing onFolderAfterUpdateFlpHook hook.",
                code: "ACO_AFTER_FOLDER_UPDATE_FLP_HOOK"
            });
        }
    });
};
