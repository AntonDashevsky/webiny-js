import { Abstraction } from "@webiny/di-container";
import { IAppModel } from "~/abstractions/models/IAppModel";
import { BaseBuildDeployParams } from "~/abstractions/types";

export interface IBuildParams extends BaseBuildDeployParams {}

export interface IBuildAppService {
    execute(app: IAppModel, buildParams: IBuildParams): Promise<void>;
}

export const BuildAppService = new Abstraction<IBuildAppService>("BuildAppService");

export namespace BuildAppService {
    export type Interface = IBuildAppService;
    export type Params = IBuildParams;
}
