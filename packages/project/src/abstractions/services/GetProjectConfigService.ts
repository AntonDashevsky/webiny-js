import { Abstraction } from "@webiny/di-container";
import { IProjectConfigModel } from "~/abstractions/models/index.js";
import { ExtensionTags } from "~/extensions/defineExtension/types";

interface IGetProjectConfigServiceParams {
    tags?: ExtensionTags;
}

interface IGetProjectConfigService {
    execute(params?: IGetProjectConfigServiceParams): Promise<IProjectConfigModel>;
}

export const GetProjectConfigService = new Abstraction<IGetProjectConfigService>(
    "GetProjectConfigService"
);

export namespace GetProjectConfigService {
    export type Interface = IGetProjectConfigService;
    export type Params = IGetProjectConfigServiceParams;
}
