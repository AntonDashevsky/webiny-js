import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";
import { IPulumiGetStackExportServiceParams } from "~/abstractions/services/PulumiGetStackExportService";

export type IGetAppStackOutputParams = IBaseAppParams;

export type IGetAppStackOutputResult<TResult extends Record<string, any> = Record<string, string>> =
    TResult | null;

export interface IGetAppStackOutput {
    execute<TOutput extends Record<string, any> = Record<string, any>>(
        params: IPulumiGetStackExportServiceParams
    ): Promise<IGetAppStackOutputResult<TOutput>>;
}

export const GetAppStackOutput = new Abstraction<IGetAppStackOutput>("GetAppStackOutput");

export namespace GetAppStackOutput {
    export type Interface = IGetAppStackOutput;

    export type Params = IGetAppStackOutputParams;
    export type Result = IGetAppStackOutputResult;
}
