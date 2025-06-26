import { Abstraction } from "@webiny/di-container";
import { BeforeBuildHook } from "~/abstractions";

export interface IBeforeBuildHooksRegistry {
    execute(): BeforeBuildHook.Interface[];
}

export const BeforeBuildHooksRegistry = new Abstraction<IBeforeBuildHooksRegistry>(
    "BeforeBuildHooksRegistry"
);

export namespace BeforeBuildHooksRegistry {
    export type Interface = IBeforeBuildHooksRegistry;
}
