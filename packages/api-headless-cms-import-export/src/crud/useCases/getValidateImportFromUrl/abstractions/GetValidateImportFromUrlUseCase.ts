import type { ICmsImportExportValidateRecord } from "~/domain/abstractions/CmsImportExportValidateRecord.js";

export interface IGetValidateImportFromUrlExecuteParams {
    id: string;
}

export type IGetValidateImportFromUrlExecuteResponse = ICmsImportExportValidateRecord;

export interface IGetValidateImportFromUrlUseCase {
    execute(
        params: IGetValidateImportFromUrlExecuteParams
    ): Promise<IGetValidateImportFromUrlExecuteResponse | null>;
}
