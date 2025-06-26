import { Abstraction } from "@webiny/di-container";

export interface IBeforeDeployHook {
    execute(): void | Promise<void>;
}

export const BeforeDeployHook = new Abstraction<IBeforeDeployHook>("BeforeDeployHook");

export namespace BeforeDeployHook {
    export type Interface = IBeforeDeployHook;
}