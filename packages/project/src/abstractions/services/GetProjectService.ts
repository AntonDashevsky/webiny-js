import { Abstraction } from "@webiny/di-container";
import { IProjectModel } from "~/abstractions/models/index.js";

type IGetProjectServiceResult = IProjectModel;

interface IGetProjectService {
    execute(cwd?: string): Promise<IGetProjectServiceResult>;
}

export const GetProjectService = new Abstraction<IGetProjectService>("GetProjectService");

export namespace GetProjectService {
    export type Interface = IGetProjectService;
    export type Result = IGetProjectService;
}
