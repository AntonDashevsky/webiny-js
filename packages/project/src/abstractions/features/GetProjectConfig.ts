import { Abstraction } from "@webiny/di-container";
import { IProjectConfigModel } from "~/abstractions/models/index.js";

interface IGetProjectConfig {
    execute<TConfig extends Record<string, any> = Record<string, any>>(): Promise<IProjectConfigModel<TConfig>>;
}

export const GetProjectConfig = new Abstraction<IGetProjectConfig>("GetProjectConfig");

export namespace GetProjectConfig {
    export type Interface = IGetProjectConfig;
}
