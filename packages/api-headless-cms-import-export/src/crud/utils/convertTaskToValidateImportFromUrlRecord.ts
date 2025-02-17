import { createCmsImportValidateRecord } from "~/domain/index.js";
import type { ITask } from "@webiny/tasks";
import type {
    IValidateImportFromUrlInput,
    IValidateImportFromUrlOutput
} from "~/tasks/domain/abstractions/ValidateImportFromUrl.js";
import type { NonEmptyArray } from "@webiny/api/types.js";
import type { ICmsImportExportValidatedFile } from "~/types.js";

export const convertTaskToValidateImportFromUrlRecord = (
    task: ITask<IValidateImportFromUrlInput, IValidateImportFromUrlOutput>
) => {
    const files = task.input.files.map(file => {
        const output = task.output?.files?.find(f => f.checksum === file.checksum);
        if (output) {
            return {
                ...output,
                error: output.error,
                type: output.type,
                size: output.size
            };
        }
        return file;
    });

    return createCmsImportValidateRecord({
        id: task.id,
        files: files as unknown as NonEmptyArray<ICmsImportExportValidatedFile>,
        status: task.taskStatus,
        error: task.output?.error
    });
};
