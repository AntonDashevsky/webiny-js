import { Abstraction } from "@webiny/di-container";
import { DeployApp } from "~/abstractions";

export interface ICoreAfterDeploy {
    execute(params: DeployApp.Params): void | Promise<void>;
}

export const CoreAfterDeploy = new Abstraction<ICoreAfterDeploy>("CoreAfterDeploy");

export namespace CoreAfterDeploy {
    export type Interface = ICoreAfterDeploy;
    export type Params = DeployApp.Params;
}
