import { Abstraction } from "@webiny/di-container";
import { ICommand } from "./ICommand";

export type ProjectInfoCommandParams = void;
export type ProjectInfoCommandResult = Array<{
    sectionName: string;
    data: Record<string, any>;
}>;

type IProjectInfoCommand = ICommand<ProjectInfoCommandParams, ProjectInfoCommandResult>;

export const ProjectInfoCommand = new Abstraction<IProjectInfoCommand>(
    "ProjectInfoCommand"
);

export namespace ProjectInfoCommand {
    export interface Interface extends IProjectInfoCommand {}

    export type Params = ProjectInfoCommandParams;

    export type Result = ProjectInfoCommandResult;
}