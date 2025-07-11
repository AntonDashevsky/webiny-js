import { Abstraction } from "@webiny/di-container";
import { IProjectConfigModel } from "~/abstractions/models/index.js";

interface IGetProjectConfig {
    execute(): Promise<IProjectConfigModel>;
}

export const GetProjectConfig = new Abstraction<IGetProjectConfig>("GetProjectConfig");

export namespace GetProjectConfig {
    export type Interface = IGetProjectConfig;
}
