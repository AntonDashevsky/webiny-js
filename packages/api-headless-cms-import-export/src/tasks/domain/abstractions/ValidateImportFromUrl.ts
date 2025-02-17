import type { Context, ICmsImportExportFile, ICmsImportExportValidatedFile } from "~/types.js";
import type {
    ITaskResponseDoneResultOutput,
    ITaskResponseResult,
    ITaskRunParams
} from "@webiny/tasks";
import type { NonEmptyArray } from "@webiny/api/types.js";
import type { IExportedCmsModel } from "~/tasks/domain/abstractions/ExportContentEntriesController.js";

export interface IValidateImportFromUrlInput {
    files: NonEmptyArray<ICmsImportExportFile>;
    model: IExportedCmsModel;
}

export interface IValidateImportFromUrlOutput extends ITaskResponseDoneResultOutput {
    modelId: string;
    files: NonEmptyArray<ICmsImportExportValidatedFile>;
    importTaskId?: string;
}

export interface IValidateImportFromUrl<
    C extends Context = Context,
    I extends IValidateImportFromUrlInput = IValidateImportFromUrlInput,
    O extends IValidateImportFromUrlOutput = IValidateImportFromUrlOutput
> {
    run(params: ITaskRunParams<C, I, O>): Promise<ITaskResponseResult<I, O>>;
}
