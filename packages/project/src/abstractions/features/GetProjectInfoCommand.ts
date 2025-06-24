import { Abstraction } from "@webiny/di-container";
import { ICommand } from "./ICommand";
import { ProjectInfoService } from "~/abstractions/services/ProjectInfoService";

type GetProjectInfoCommandParams = void;
type GetProjectInfoCommandResult = ProjectInfoService.Result;

type IGetProjectInfoCommand = ICommand<GetProjectInfoCommandParams, GetProjectInfoCommandResult>;

export const GetProjectInfoCommand = new Abstraction<IGetProjectInfoCommand>("GetProjectInfoCommand");

export namespace GetProjectInfoCommand {
    export type Interface = IGetProjectInfoCommand;

    export type Params = GetProjectInfoCommandParams;

    export type Result = GetProjectInfoCommandResult;
}
