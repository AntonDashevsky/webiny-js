import { Abstraction } from "@webiny/di-container";
import { type Watch } from "~/abstractions/index.js";

export interface ICoreAfterWatch {
    execute(params: Watch.Params): void | Promise<void>;
}

export const CoreAfterWatch = new Abstraction<ICoreAfterWatch>("CoreAfterWatch");

export namespace CoreAfterWatch {
    export type Interface = ICoreAfterWatch;
    export type Params = Watch.Params;
}
