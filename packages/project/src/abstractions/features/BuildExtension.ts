import { Abstraction } from "@webiny/di-container";

export interface IBuildExtension {
    execute(): void | Promise<void>;
}

export const BuildExtension = new Abstraction<IBuildExtension>("BuildExtension");

export namespace BuildExtension {
    export type Interface = IBuildExtension;
}
