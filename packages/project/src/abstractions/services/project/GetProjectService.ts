import { Abstraction } from "@webiny/di-container";
import { IProjectModel } from "~/abstractions/models/IProjectModel";

export interface IGetProjectService {
    execute(cwd?: string): IProjectModel;
}

export const GetProjectService = new Abstraction<IGetProjectService>("GetProjectService");

export namespace GetProjectService {
    export type Interface = IGetProjectService;
}
