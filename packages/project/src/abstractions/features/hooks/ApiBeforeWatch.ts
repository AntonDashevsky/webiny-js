import { Abstraction } from "@webiny/di-container";
import { type Watch } from "~/abstractions/index.js";

export interface IApiBeforeWatch {
    execute(params: Watch.Params): void | Promise<void>;
}

export const ApiBeforeWatch = new Abstraction<IApiBeforeWatch>("ApiBeforeWatch");

export namespace ApiBeforeWatch {
    export type Interface = IApiBeforeWatch;
    export type Params = Watch.Params;
}
