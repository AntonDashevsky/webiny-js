import { createTaskDefinition } from "@webiny/tasks";
import { EXPORT_CONTENT_ENTRIES_CONTROLLER_TASK } from "./constants.js";
import type { Context } from "~/types.js";
import type {
    IExportContentEntriesControllerInput,
    IExportContentEntriesControllerOutput
} from "~/tasks/domain/abstractions/ExportContentEntriesController.js";

export const createExportContentEntriesControllerTask = () => {
    return createTaskDefinition<
        Context,
        IExportContentEntriesControllerInput,
        IExportContentEntriesControllerOutput
    >({
        id: EXPORT_CONTENT_ENTRIES_CONTROLLER_TASK,
        title: "Export Content Entries and Assets Controller",
        maxIterations: 100,
        isPrivate: true,
        description: "Export content entries and assets from a specific model - controller.",
        async run(params) {
            const { ExportContentEntriesController } = await import(
                /* webpackChunkName: "ExportContentEntriesController" */ "./domain/ExportContentEntriesController.js"
            );

            try {
                const controller = new ExportContentEntriesController();
                return await controller.run(params);
            } catch (ex) {
                return params.response.error(ex);
            }
        }
    });
};
