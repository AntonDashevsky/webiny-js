import { Abstraction } from "@webiny/di-container";
import { BuildApp } from "~/abstractions/index.js";

export interface IBeforeBuild {
    execute(params: BuildApp.Params): void | Promise<void>;
}

export const BeforeBuild = new Abstraction<IBeforeBuild>("BeforeBuild");

export namespace BeforeBuild {
    export type Interface = IBeforeBuild;
    export type Params = BuildApp.Params;
}