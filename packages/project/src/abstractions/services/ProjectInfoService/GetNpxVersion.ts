import { Abstraction } from "@webiny/di-container";

interface IGetNpxVersion {
    execute(): string;
}

export const GetNpxVersion = new Abstraction<IGetNpxVersion>("GetNpxVersion");

export namespace GetNpxVersion {
    export interface Interface extends IGetNpxVersion {}
}