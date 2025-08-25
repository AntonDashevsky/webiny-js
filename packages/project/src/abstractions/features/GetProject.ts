import { Abstraction } from "@webiny/di-container";
import { IProjectModel } from "~/abstractions/models/index.js";

interface IGetProject {
    execute(cwd?: string): IProjectModel;
}

export const GetProject = new Abstraction<IGetProject>("GetProject");

export namespace GetProject {
    export type Interface = IGetProject;
}
