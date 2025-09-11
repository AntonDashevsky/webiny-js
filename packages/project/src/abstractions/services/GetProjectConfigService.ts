import { Abstraction } from "@webiny/di-container";
import { type IProjectConfigModel } from "~/abstractions/models/index.js";
import { type ExtensionTags } from "~/extensions/defineExtension/types.js";

interface IGetProjectConfigServiceParams {
    tags?: ExtensionTags;
    renderArgs?: Record<string, any>;
}

type IGetProjectConfigServiceResult = IProjectConfigModel;

interface IGetProjectConfigService {
    execute(params?: IGetProjectConfigServiceParams): Promise<IGetProjectConfigServiceResult>;
}

export const GetProjectConfigService = new Abstraction<IGetProjectConfigService>(
    "GetProjectConfigService"
);

export namespace GetProjectConfigService {
    export type Interface = IGetProjectConfigService;
    export type Params = IGetProjectConfigServiceParams;
    export type Result = IGetProjectConfigServiceResult;
}
