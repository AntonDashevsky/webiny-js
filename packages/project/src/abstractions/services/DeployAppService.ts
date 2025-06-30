import { Abstraction } from "@webiny/di-container";
import { IAppModel } from "~/abstractions/models/IAppModel";
import { BaseBuildDeployParams } from "~/abstractions/types";
import { ExecaChildProcess } from "execa";

export type IPulumiProcess = ExecaChildProcess<string>;

export interface IDeployParams extends BaseBuildDeployParams {
    preview?: boolean;
    debug?: boolean;

    /**
     * Called immediately after the Pulumi process is created.
     * You can pipe, attach event handlers, etc.
     */
    onPulumiProcess?: (process: IPulumiProcess) => void;
}

export interface IDeployAppService {
    execute(app: IAppModel, params: IDeployParams): Promise<void>
}

export const DeployAppService = new Abstraction<IDeployAppService>("DeployAppService");

export namespace DeployAppService {
    export type Interface = IDeployAppService;
    export type Params = IDeployParams;
}
