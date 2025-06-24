import { Abstraction } from "@webiny/di-container";

interface IGetYarnVersion {
    execute(): string;
}

export const GetYarnVersion = new Abstraction<IGetYarnVersion>("GetYarnVersion");

export namespace GetYarnVersion {
    export interface Interface extends IGetYarnVersion {}
}