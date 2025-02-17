import { createTaskDefinition } from "@webiny/tasks";
import { EXPORT_CONTENT_ENTRIES_TASK } from "./constants.js";
import type { Context } from "~/types.js";
import type {
    IExportContentEntriesInput,
    IExportContentEntriesOutput
} from "~/tasks/domain/abstractions/ExportContentEntries.js";

export const createExportContentEntriesTask = () => {
    return createTaskDefinition<Context, IExportContentEntriesInput, IExportContentEntriesOutput>({
        id: EXPORT_CONTENT_ENTRIES_TASK,
        title: "Export Content Entries",
        maxIterations: 50,
        isPrivate: true,
        description: "Export content entries from a specific model.",
        async run(params) {
            const { createExportContentEntries } = await import(
                /* webpackChunkName: "createExportContentEntries" */ "./domain/createExportContentEntries.js"
            );

            try {
                const runner = createExportContentEntries();
                return await runner.run(params);
            } catch (ex) {
                return params.response.error(ex);
            }
        }
    });
};
