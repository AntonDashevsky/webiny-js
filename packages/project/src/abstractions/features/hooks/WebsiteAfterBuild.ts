import { Abstraction } from "@webiny/di-container";
import { type BuildApp } from "~/abstractions/index.js";

export interface IWebsiteAfterBuild {
    execute(params: BuildApp.Params): void | Promise<void>;
}

export const WebsiteAfterBuild = new Abstraction<IWebsiteAfterBuild>("WebsiteAfterBuild");

export namespace WebsiteAfterBuild {
    export type Interface = IWebsiteAfterBuild;
    export type Params = BuildApp.Params;
}