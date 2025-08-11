import { Abstraction } from "@webiny/di-container";
import { BuildApp } from "~/abstractions";

export interface ICoreBeforeBuild {
    execute(params: BuildApp.Params): void | Promise<void>;
}

export const CoreBeforeBuild = new Abstraction<ICoreBeforeBuild>("CoreBeforeBuild");

export namespace CoreBeforeBuild {
    export type Interface = ICoreBeforeBuild;
    export type Params = BuildApp.Params;
}