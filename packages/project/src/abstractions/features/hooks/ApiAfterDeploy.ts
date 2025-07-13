import { Abstraction } from "@webiny/di-container";
import { DeployApp } from "~/abstractions";

export interface IApiAfterDeploy {
    execute(params: DeployApp.Params): void | Promise<void>;
}

export const ApiAfterDeploy = new Abstraction<IApiAfterDeploy>("ApiAfterDeploy");

export namespace ApiAfterDeploy {
    export type Interface = IApiAfterDeploy;
    export type Params = DeployApp.Params;
}
