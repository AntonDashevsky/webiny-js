import { Abstraction } from "@webiny/di-container";
import { DeployApp } from "~/abstractions";

export interface IWebsiteBeforeDeploy {
    execute(params: DeployApp.Params): void | Promise<void>;
}

export const WebsiteBeforeDeploy = new Abstraction<IWebsiteBeforeDeploy>("WebsiteBeforeDeploy");

export namespace WebsiteBeforeDeploy {
    export type Interface = IWebsiteBeforeDeploy;
    export type Params = DeployApp.Params;
}
