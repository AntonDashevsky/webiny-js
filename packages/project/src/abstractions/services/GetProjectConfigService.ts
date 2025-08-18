import { Abstraction } from "@webiny/di-container";
import { IProjectConfigModel } from "~/abstractions/models/index.js";
import { ExtensionTags } from "~/extensions/defineExtension/types";

interface IGetProjectConfigServiceParams {
    tags?: ExtensionTags;
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
