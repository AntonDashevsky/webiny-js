import { Abstraction } from "@webiny/di-container";

export type PulumiVersion = string;
export type PulumiAwsVersion = string;
export type IGetPulumiVersionResult = [PulumiVersion, PulumiAwsVersion];

interface IGetPulumiVersion {
    execute(): IGetPulumiVersionResult;
}

export const GetPulumiVersion = new Abstraction<IGetPulumiVersion>("GetPulumiVersion");

export namespace GetPulumiVersion {
    export type Interface = IGetPulumiVersion;

    export type Result = IGetPulumiVersionResult;
}