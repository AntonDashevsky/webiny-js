import { Abstraction } from "@webiny/di-container";
import { type Watch } from "~/abstractions/index.js";

export interface IApiAfterWatch {
    execute(params: Watch.Params): void | Promise<void>;
}

export const ApiAfterWatch = new Abstraction<IApiAfterWatch>("ApiAfterWatch");

export namespace ApiAfterWatch {
    export type Interface = IApiAfterWatch;
    export type Params = Watch.Params;
}
