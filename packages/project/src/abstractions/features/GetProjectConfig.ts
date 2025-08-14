import { Abstraction } from "@webiny/di-container";
import { IProjectConfigModel } from "~/abstractions/models/index.js";
import { ExtensionTags } from "~/extensions/defineExtension/types";

interface IGetProjectConfigParams {
    tags?: ExtensionTags;
}

interface IGetProjectConfig {
    execute(params?: IGetProjectConfigParams): Promise<IProjectConfigModel>;
}

export const GetProjectConfig = new Abstraction<IGetProjectConfig>("GetProjectConfig");

export namespace GetProjectConfig {
    export type Interface = IGetProjectConfig;
    export type Params = IGetProjectConfigParams;
}
