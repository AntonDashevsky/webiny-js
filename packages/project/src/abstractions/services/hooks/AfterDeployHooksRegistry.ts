import { Abstraction } from "@webiny/di-container";
import { AfterDeployHook } from "~/abstractions";

export interface IAfterDeployHooksRegistry {
    execute(): AfterDeployHook.Interface[];
}

export const AfterDeployHooksRegistry = new Abstraction<IAfterDeployHooksRegistry>("AfterDeployHooksRegistry");

export namespace AfterDeployHooksRegistry {
    export type Interface = IAfterDeployHooksRegistry;
}