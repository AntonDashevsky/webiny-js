import { Abstraction } from "@webiny/di-container";
import { type DeployApp } from "~/abstractions/index.js";

export interface IWebsiteAfterDeploy {
    execute(params: DeployApp.Params): void | Promise<void>;
}

export const WebsiteAfterDeploy = new Abstraction<IWebsiteAfterDeploy>("WebsiteAfterDeploy");

export namespace WebsiteAfterDeploy {
    export type Interface = IWebsiteAfterDeploy;
    export type Params = DeployApp.Params;
}
