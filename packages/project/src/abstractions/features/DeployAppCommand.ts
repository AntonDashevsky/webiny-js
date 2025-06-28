import { Abstraction } from "@webiny/di-container";
import { ICommand } from "./ICommand";
import { DeployAppService } from "~/abstractions";

export interface DeployAppCommandParams extends DeployAppService.Params {
    app: string;
}

type IDeployAppCommand = ICommand<DeployAppCommandParams>;

export const DeployAppCommand = new Abstraction<IDeployAppCommand>("DeployAppCommand");

export namespace DeployAppCommand {
    export type Interface = IDeployAppCommand;

    export type Params = DeployAppCommandParams;
}
