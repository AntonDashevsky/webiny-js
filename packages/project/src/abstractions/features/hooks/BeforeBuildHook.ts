import { Abstraction } from "@webiny/di-container";

export interface IBeforeBuildHook {
    execute(): void | Promise<void>;
}

export const BeforeBuildHook = new Abstraction<IBeforeBuildHook>("BeforeBuildHook");

export namespace BeforeBuildHook {
    export type Interface = IBeforeBuildHook;
}