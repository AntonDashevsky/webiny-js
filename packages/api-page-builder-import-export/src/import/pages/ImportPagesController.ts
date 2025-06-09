import { type ITaskResponseResult } from "@webiny/tasks";
import { ImportPagesProcessPagesChecker } from "./controller/ImportPagesProcessPagesChecker.js";
import { ImportPagesProcessZipFile } from "./controller/ImportPagesProcessZipFile.js";
import { type IImportPagesControllerTaskParams } from "./types.js";

export class ImportPagesController {
    public async execute(params: IImportPagesControllerTaskParams): Promise<ITaskResponseResult> {
        const { response, isAborted, input } = params;
        if (isAborted()) {
            return response.aborted();
        }
        if (input.processing) {
            const importPagesProcessPagesChecker = new ImportPagesProcessPagesChecker();

            return await importPagesProcessPagesChecker.execute(params);
        }
        const importPagesProcessZipFile = new ImportPagesProcessZipFile();

        return importPagesProcessZipFile.execute(params);
    }
}
