import { Abstraction } from "@webiny/di-container";
import { type DeployApp } from "~/abstractions/index.js";

export interface ICoreBeforeWatch {
    execute(params: DeployApp.Params): void | Promise<void>;
}

export const CoreBeforeWatch = new Abstraction<ICoreBeforeWatch>("CoreBeforeWatch");

export namespace CoreBeforeWatch {
    export type Interface = ICoreBeforeWatch;
    export type Params = DeployApp.Params;
}
