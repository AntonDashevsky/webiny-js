import { Abstraction } from "@webiny/di-container";
import { ICommand } from "./ICommand";
import { ProjectInfoService } from "~/abstractions/services/ProjectInfoService";

type ProjectInfoCommandParams = void;
type ProjectInfoCommandResult = ProjectInfoService.Result;

type IProjectInfoCommand = ICommand<ProjectInfoCommandParams, ProjectInfoCommandResult>;

export const ProjectInfoCommand = new Abstraction<IProjectInfoCommand>(
    "ProjectInfoCommand"
);

export namespace ProjectInfoCommand {
    export interface Interface extends IProjectInfoCommand {}

    export type Params = ProjectInfoCommandParams;

    export type Result = ProjectInfoCommandResult;
}