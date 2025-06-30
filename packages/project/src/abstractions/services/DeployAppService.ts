import { Abstraction } from "@webiny/di-container";
import { IAppModel } from "~/abstractions/models/IAppModel";
import { BaseBuildDeployParams } from "~/abstractions/types";

export interface IDeployParams extends BaseBuildDeployParams {
    preview?: boolean;
    debug?: boolean;
}

export interface IDeployAppService {
    execute(app: IAppModel, params: IDeployParams): Promise<void>;
}

export const DeployAppService = new Abstraction<IDeployAppService>("DeployAppService");

export namespace DeployAppService {
    export type Interface = IDeployAppService;
    export type Params = IDeployParams;
}
