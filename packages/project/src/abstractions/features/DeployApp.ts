import { Abstraction } from "@webiny/di-container";
import { IBaseAppParams } from "~/abstractions/types.js";
import { ExecaChildProcess } from "execa";

type IPulumiProcess = ExecaChildProcess<string>;

interface IDeployAppParams extends IBaseAppParams {
    preview?: boolean;
    debug?: boolean;
    output?: (pulumiProcess: IPulumiProcess) => void | Promise<void>;
}

interface IDeployApp {
    execute(params: IDeployAppParams): Promise<{ pulumiProcess: IPulumiProcess }>;
}

export const DeployApp = new Abstraction<IDeployApp>("DeployApp");

export namespace DeployApp {
    export type Interface = IDeployApp;

    export type Params = IDeployAppParams;

    export type PulumiProcess = IPulumiProcess;
}
