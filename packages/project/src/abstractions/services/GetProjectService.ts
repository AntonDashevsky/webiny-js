import { Abstraction } from "@webiny/di-container";
import { IProjectModel } from "~/abstractions/models";

interface IGetProjectService {
    execute(cwd?: string): Promise<IProjectModel>;
}

export const GetProjectService = new Abstraction<IGetProjectService>("GetProjectService");

export namespace GetProjectService {
    export type Interface = IGetProjectService;
}
