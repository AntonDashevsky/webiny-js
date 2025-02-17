import type { ICmsImportExportRecord } from "~/domain/index.js";
import type { CmsEntryListSort, CmsEntryListWhere } from "@webiny/api-headless-cms/types/index.js";

export interface IExportContentEntriesUseCaseExecuteParams {
    modelId: string;
    exportAssets: boolean;
    limit?: number;
    where?: CmsEntryListWhere;
    sort?: CmsEntryListSort;
}

export interface IExportContentEntriesUseCase {
    execute(params: IExportContentEntriesUseCaseExecuteParams): Promise<ICmsImportExportRecord>;
}
