import { Abstraction } from "@webiny/di-container";
import { BuildApp } from "~/abstractions";

export interface IApiBeforeBuild {
    execute(params: BuildApp.Params): void | Promise<void>;
}

export const ApiBeforeBuild = new Abstraction<IApiBeforeBuild>("ApiBeforeBuild");

export namespace ApiBeforeBuild {
    export type Interface = IApiBeforeBuild;
    export type Params = BuildApp.Params;
}