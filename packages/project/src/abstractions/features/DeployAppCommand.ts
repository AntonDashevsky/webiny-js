import { Abstraction } from "@webiny/di-container";
import { ICommand } from "./ICommand";

export interface DeployAppCommandParams {
    app: string;
    env: string;
    variant?: string;
    region?: string;
    build?: boolean;
    deploy?: boolean;
    preview?: boolean;
    allowLocalStateFiles?: boolean;

    debug?: boolean;
    logs?: boolean;
    deploymentLogs?: boolean;
}

type IDeployAppCommand = ICommand<DeployAppCommandParams>;

export const DeployAppCommand = new Abstraction<IDeployAppCommand>("DeployAppCommand");

namespace DeployAppCommand {
    export type Interface = IDeployAppCommand;

    export type Params = DeployAppCommandParams;
}
