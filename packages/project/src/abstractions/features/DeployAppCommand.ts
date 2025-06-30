import { Abstraction } from "@webiny/di-container";
import { I } from "./I";
import { DeployAppService } from "~/abstractions";

export interface DeployAppParams extends DeployAppService.Params {
    app: string;
}

type IDeployApp = I<DeployAppParams>;

export const DeployApp = new Abstraction<IDeployApp>("DeployApp");

export namespace DeployApp {
    export type Interface = IDeployApp;

    export type Params = DeployAppParams;
}
