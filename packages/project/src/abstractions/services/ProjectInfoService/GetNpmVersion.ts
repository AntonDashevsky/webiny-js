import { Abstraction } from "@webiny/di-container";

interface IGetNpmVersion {
    execute(): string;
}

export const GetNpmVersion = new Abstraction<IGetNpmVersion>("GetNpmVersion");

export namespace GetNpmVersion {
    export type Interface = IGetNpmVersion;
}
