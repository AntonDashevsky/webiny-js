import { Abstraction } from "@webiny/di-container";
import { PulumiGetStackOutputService } from "~/abstractions";
import { I } from "~/abstractions/features/I";

export interface IGetAppOutputParams extends PulumiGetStackOutputService.Params {
    app: string;
}
type IGetAppOutput<TOutput = Record<string, any>> = I<IGetAppOutputParams, TOutput | null>;

export const GetAppOutput = new Abstraction<IGetAppOutput>("GetAppOutput");

export namespace GetAppOutput {
    export type Interface = IGetAppOutput;
    export type Params = IGetAppOutputParams;
}