import { Abstraction } from "@webiny/di-container";
import { DeployApp } from "~/abstractions";

export interface ICoreBeforeDeploy {
    execute(params: DeployApp.Params): void | Promise<void>;
}

export const CoreBeforeDeploy = new Abstraction<ICoreBeforeDeploy>("CoreBeforeDeploy");

export namespace CoreBeforeDeploy {
    export type Interface = ICoreBeforeDeploy;
    export type Params = DeployApp.Params;
}
