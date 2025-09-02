import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";
import { IPulumiGetStackOutputServiceParams } from "~/abstractions/services/PulumiGetStackOutputService.js";

export type IGetAppStackOutputParams = IBaseAppParams;

export interface IStackOutput {
    /**
     * There is a possibility for a user to add stuff to the stack output.
     */
    [key: string]: string | string[] | undefined | number | number[] | boolean;
}

export type IGetAppStackOutputResult<TOutput extends IStackOutput = IStackOutput> = TOutput | null;

export interface IGetAppStackOutput {
    execute<TOutput extends IStackOutput = IStackOutput>(
        params: IPulumiGetStackOutputServiceParams
    ): Promise<IGetAppStackOutputResult<TOutput>>;
}

export const GetAppStackOutput = new Abstraction<IGetAppStackOutput>("GetAppStackOutput");

export namespace GetAppStackOutput {
    export type Interface = IGetAppStackOutput;

    export type Params = IGetAppStackOutputParams;
    export type Result = IGetAppStackOutputResult;
    export type StackOutput = IStackOutput;
}
