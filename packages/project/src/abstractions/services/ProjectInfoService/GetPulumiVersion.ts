import { Abstraction } from "@webiny/di-container";

export type PulumiVersion = string;
export type PulumiAwsVersion = string;
export type GetPulumiVersionResult = [PulumiVersion, PulumiAwsVersion];

interface IGetPulumiVersion {
    execute(): GetPulumiVersionResult;
}

export const GetPulumiVersion = new Abstraction<IGetPulumiVersion>("GetPulumiVersion");

export namespace GetPulumiVersion {
    export interface Interface extends IGetPulumiVersion {}
}