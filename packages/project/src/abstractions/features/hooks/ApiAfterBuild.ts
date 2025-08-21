import { Abstraction } from "@webiny/di-container";
import { BuildApp } from "~/abstractions/index.js";

export interface IApiAfterBuild {
    execute(params: BuildApp.Params): void | Promise<void>;
}

export const ApiAfterBuild = new Abstraction<IApiAfterBuild>("ApiAfterBuild");

export namespace ApiAfterBuild {
    export type Interface = IApiAfterBuild;
    export type Params = BuildApp.Params;
}