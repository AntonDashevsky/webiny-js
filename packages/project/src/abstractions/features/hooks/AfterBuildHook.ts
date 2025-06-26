import { Abstraction } from "@webiny/di-container";

export interface IAfterBuildHook {
    execute(): void | Promise<void>;
}

export const AfterBuildHook = new Abstraction<IAfterBuildHook>("AfterBuildHook");

export namespace AfterBuildHook {
    export type Interface = IAfterBuildHook;
}