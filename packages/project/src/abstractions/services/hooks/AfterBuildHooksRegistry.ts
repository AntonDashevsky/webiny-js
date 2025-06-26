import { Abstraction } from "@webiny/di-container";
import { AfterBuildHook } from "~/abstractions";

export interface IAfterBuildHooksRegistry {
    execute(): AfterBuildHook.Interface[];
}

export const AfterBuildHooksRegistry = new Abstraction<IAfterBuildHooksRegistry>("AfterBuildHooksRegistry");

export namespace AfterBuildHooksRegistry {
    export type Interface = IAfterBuildHooksRegistry;
}