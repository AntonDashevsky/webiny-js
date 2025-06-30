import { Abstraction } from "@webiny/di-container";
import { IProjectModel } from "~/abstractions/models";
import { I } from "./I";

type IGetProject = I<string | undefined, IProjectModel>;

export const GetProject = new Abstraction<IGetProject>("GetProject");

export namespace GetProject {
    export type Interface = IGetProject;
}
