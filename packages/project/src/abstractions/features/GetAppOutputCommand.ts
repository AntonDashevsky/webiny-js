import { Abstraction } from "@webiny/di-container";
import { PulumiGetStackOutputService } from "~/abstractions";
import { ICommand } from "~/abstractions/features/ICommand";

export interface IGetAppOutputCommandParams extends PulumiGetStackOutputService.Params {
    app: string;
}
type IGetAppOutputCommand<TOutput = Record<string, any>> = ICommand<IGetAppOutputCommandParams, TOutput | null>;

export const GetAppOutputCommand = new Abstraction<IGetAppOutputCommand>("GetAppOutputCommand");

export namespace GetAppOutputCommand {
    export type Interface = IGetAppOutputCommand;
    export type Params = IGetAppOutputCommandParams;
}