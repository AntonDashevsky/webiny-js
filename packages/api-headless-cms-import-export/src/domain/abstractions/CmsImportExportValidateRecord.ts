import type { ICmsImportExportValidatedFile } from "~/types.js";
import type { GenericRecord, NonEmptyArray } from "@webiny/api/types.js";
import type { TaskDataStatus } from "@webiny/tasks";

export interface ICmsImportExportValidateRecord {
    id: string;
    files: NonEmptyArray<ICmsImportExportValidatedFile> | undefined;
    status: TaskDataStatus;
    error?: GenericRecord;
}
