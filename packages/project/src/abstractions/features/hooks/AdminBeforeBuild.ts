import { Abstraction } from "@webiny/di-container";
import { BuildApp } from "~/abstractions";

export interface IAdminBeforeBuild {
    execute(params: BuildApp.Params): void | Promise<void>;
}

export const AdminBeforeBuild = new Abstraction<IAdminBeforeBuild>("AdminBeforeBuild");

export namespace AdminBeforeBuild {
    export type Interface = IAdminBeforeBuild;
    export type Params = BuildApp.Params;
}