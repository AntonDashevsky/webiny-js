import { createExportPagesControllerTask } from "./exportPagesControllerTask.js";
import { createImportPagesControllerTask } from "./importPagesControllerTask.js";
import { createExportPagesZipPagesTask } from "./exportPagesZipPagesTask.js";
import { createExportPagesCleanupTask } from "./exportPagesCleanupTask.js";
import { createImportPagesProcessPagesTask } from "./importPagesProcessPageTask.js";

export const createPagesTasks = () => {
    return [
        createExportPagesControllerTask(),
        createExportPagesZipPagesTask(),
        createExportPagesCleanupTask(),
        createImportPagesControllerTask(),
        createImportPagesProcessPagesTask()
    ];
};
