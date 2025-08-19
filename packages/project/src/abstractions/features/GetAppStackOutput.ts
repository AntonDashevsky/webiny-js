import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";
import { IPulumiGetStackExportServiceParams } from "~/abstractions/services/PulumiGetStackExportService";

export type IGetAppStackOutputParams = IBaseAppParams;

export interface IStackOutput {
    [key: string]: any;
}

export type IGetAppStackOutputResult<TOutput extends IStackOutput = IStackOutput> = TOutput | null;

export interface IGetAppStackOutput {
    execute<TOutput extends IStackOutput = IStackOutput>(
        params: IPulumiGetStackExportServiceParams
    ): Promise<IGetAppStackOutputResult<TOutput>>;
}

export const GetAppStackOutput = new Abstraction<IGetAppStackOutput>("GetAppStackOutput");

export namespace GetAppStackOutput {
    export type Interface = IGetAppStackOutput;

    export type Params = IGetAppStackOutputParams;
    export type Result = IGetAppStackOutputResult;
    export type StackOutput = IStackOutput;
}
