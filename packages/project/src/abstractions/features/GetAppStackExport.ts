import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";
import { IPulumiGetStackExportServiceParams } from "~/abstractions/services/PulumiGetStackExportService";

export type IGetAppStackExportParams = IBaseAppParams;

export type IGetAppStackExportResult<TResult extends Record<string, any> = Record<string, string>> =
    TResult | null;

export interface IGetAppStackExport {
    execute<TExport extends Record<string, any> = Record<string, any>>(
        params: IPulumiGetStackExportServiceParams
    ): Promise<IGetAppStackExportResult<TExport>>;
}

export const GetAppStackExport = new Abstraction<IGetAppStackExport>("GetAppStackExport");

export namespace GetAppStackExport {
    export type Interface = IGetAppStackExport;

    export type Params = IGetAppStackExportParams;
    export type Result = IGetAppStackExportResult;
}
