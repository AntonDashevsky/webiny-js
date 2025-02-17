import { IMPORT_FROM_URL_DOWNLOAD_TASK } from "~/tasks/constants.js";
import { createTaskDefinition } from "@webiny/tasks";
import type { Context } from "~/types.js";
import type {
    IImportFromUrlDownloadInput,
    IImportFromUrlDownloadOutput
} from "~/tasks/domain/abstractions/ImportFromUrlDownload.js";

export const createImportFromUrlDownloadTask = () => {
    return createTaskDefinition<Context, IImportFromUrlDownloadInput, IImportFromUrlDownloadOutput>(
        {
            id: IMPORT_FROM_URL_DOWNLOAD_TASK,
            title: "Import from URL List - Download",
            maxIterations: 500,
            isPrivate: true,
            description: "Downloads the files from external URL.",
            async run(params) {
                const { ImportFromUrlDownload } = await import(
                    /* webpackChunkName: "ImportFromUrlDownload" */ "./domain/ImportFromUrlDownload.js"
                );

                try {
                    const runner = new ImportFromUrlDownload();
                    return await runner.run(params);
                } catch (ex) {
                    return params.response.error(ex);
                }
            }
        }
    );
};
