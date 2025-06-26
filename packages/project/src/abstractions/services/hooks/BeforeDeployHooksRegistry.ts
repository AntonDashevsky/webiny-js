import { Abstraction } from "@webiny/di-container";
import { BeforeDeployHook } from "~/abstractions";

export interface IBeforeDeployHooksRegistry {
    execute(): BeforeDeployHook.Interface[]
}

export const BeforeDeployHooksRegistry = new Abstraction<IBeforeDeployHooksRegistry>("BeforeDeployHooksRegistry");

export namespace BeforeDeployHooksRegistry {
    export type Interface = IBeforeDeployHooksRegistry;
}