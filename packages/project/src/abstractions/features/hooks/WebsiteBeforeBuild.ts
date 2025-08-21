import { Abstraction } from "@webiny/di-container";
import { BuildApp } from "~/abstractions/index.js";

export interface IWebsiteBeforeBuild {
    execute(params: BuildApp.Params): void | Promise<void>;
}

export const WebsiteBeforeBuild = new Abstraction<IWebsiteBeforeBuild>("WebsiteBeforeBuild");

export namespace WebsiteBeforeBuild {
    export type Interface = IWebsiteBeforeBuild;
    export type Params = BuildApp.Params;
}