import { Abstraction } from "@webiny/di-container";
import { IProjectModel } from "~/abstractions/models";
import { ICommand } from "./ICommand";

type IGetProjectCommand = ICommand<string | undefined, IProjectModel>;

export const GetProjectCommand = new Abstraction<IGetProjectCommand>("GetProjectCommand");

export namespace GetProjectCommand {
    export type Interface = IGetProjectCommand;
}
