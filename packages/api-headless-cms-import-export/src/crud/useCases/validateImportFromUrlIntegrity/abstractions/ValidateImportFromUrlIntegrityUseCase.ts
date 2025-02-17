import type { NonEmptyArray } from "@webiny/api/types.js";
import type { ICmsImportExportFile } from "~/types.js";
import type { TaskDataStatus } from "@webiny/tasks";
import type { CmsModel } from "@webiny/api-headless-cms/types/index.js";

export interface IValidateImportFromUrlIntegrityUseCaseExecuteParams {
    files: NonEmptyArray<ICmsImportExportFile>;
    model: CmsModel;
}

export interface IValidateImportFromUrlIntegrityUseCaseExecuteResult {
    id: string;
    status: TaskDataStatus;
}

export interface IValidateImportFromUrlIntegrityUseCase {
    execute(
        params: IValidateImportFromUrlIntegrityUseCaseExecuteParams
    ): Promise<IValidateImportFromUrlIntegrityUseCaseExecuteResult>;
}
