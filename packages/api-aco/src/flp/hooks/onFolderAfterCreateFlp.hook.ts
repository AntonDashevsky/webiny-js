import WebinyError from "@webiny/error";
import type { AcoContext } from "~/types.js";
import { type ICreateFlpTaskInput } from "~/types.js";
import { CREATE_FLP_TASK_ID } from "../tasks/index.js";
import { CreateFlp } from "~/flp/useCases/index.js";

export const onFolderAfterCreateFlpHook = (context: AcoContext) => {
    context.aco.folder.onFolderAfterCreate.subscribe(async ({ folder }) => {
        try {
            if (!context.tasks) {
                const useCase = new CreateFlp(context);
                await useCase.execute(folder);
                return;
            }

            await context.tasks.trigger<ICreateFlpTaskInput>({
                definition: CREATE_FLP_TASK_ID,
                input: {
                    folder
                }
            });
        } catch (error) {
            throw WebinyError.from(error, {
                message: "Error while executing onFolderAfterCreateFlpHook hook.",
                code: "ACO_AFTER_FOLDER_CREATE_FLP_HOOK"
            });
        }
    });
};
