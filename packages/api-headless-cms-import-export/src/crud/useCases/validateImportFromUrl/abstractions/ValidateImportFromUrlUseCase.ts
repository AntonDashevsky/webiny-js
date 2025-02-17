import type { ICmsImportExportFile } from "~/types.js";
import type { GenericRecord, NonEmptyArray } from "@webiny/api/types.js";
import type { CmsModel } from "@webiny/api-headless-cms/types/index.js";

export interface IValidateImportFromUrlUseCaseExecuteParams {
    data: string | GenericRecord;
}

export interface IValidateImportFromUrlUseCaseExecuteResult {
    model: CmsModel;
    files: NonEmptyArray<ICmsImportExportFile>;
}

export interface IValidateImportFromUrlUseCase {
    execute(
        params: IValidateImportFromUrlUseCaseExecuteParams
    ): Promise<IValidateImportFromUrlUseCaseExecuteResult>;
}
