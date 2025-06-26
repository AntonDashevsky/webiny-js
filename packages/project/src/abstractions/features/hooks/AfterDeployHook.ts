import { Abstraction } from "@webiny/di-container";

export interface IAfterDeployHook {
    execute(): void | Promise<void>;
}

export const AfterDeployHook = new Abstraction<IAfterDeployHook>("AfterDeployHook");

export namespace AfterDeployHook {
    export type Interface = IAfterDeployHook;
}