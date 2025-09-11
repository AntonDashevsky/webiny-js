import { Abstraction } from "@webiny/di-container";
import { type IProjectConfigModel } from "~/abstractions/models/index.js";
import { type ExtensionTags } from "~/extensions/defineExtension/types.js";

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
