import { Abstraction } from "@webiny/di-container";
import { type Watch } from "~/abstractions/index.js";

export interface IAdminAfterWatch {
    execute(params: Watch.Params): void | Promise<void>;
}

export const AdminAfterWatch = new Abstraction<IAdminAfterWatch>("AdminAfterWatch");

export namespace AdminAfterWatch {
    export type Interface = IAdminAfterWatch;
    export type Params = Watch.Params;
}
