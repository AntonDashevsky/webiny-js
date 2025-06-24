import { Abstraction } from "@webiny/di-container";
import { IAppModel, IProjectModel } from "~/abstractions/models";
import { ICommand } from "./ICommand";

type IGetAppCommandParams = {
    project: IProjectModel,
    appName: string;
}

type IGetAppCommand = ICommand<IGetAppCommandParams, IAppModel>;

export const GetAppCommand = new Abstraction<IGetAppCommand>("GetAppCommand");

export namespace GetAppCommand {
    export type Interface = IGetAppCommand;
    export type Params = IGetAppCommandParams;
}
