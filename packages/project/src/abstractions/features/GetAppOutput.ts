import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types";

export interface IGetAppOutputParams extends IBaseAppParams {}

export interface IGetAppOutput {
    execute<TOutput extends Record<string, any> = Record<string, any>>(
        params: IGetAppOutputParams
    ): Promise<TOutput | null>;
}

export const GetAppOutput = new Abstraction<IGetAppOutput>("GetAppOutput");

export namespace GetAppOutput {
    export type Interface = IGetAppOutput;

    export type Params = IGetAppOutputParams;
}
