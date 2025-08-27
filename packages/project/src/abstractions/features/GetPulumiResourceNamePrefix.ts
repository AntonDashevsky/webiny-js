import { Abstraction } from "@webiny/di-container";

export interface IGetPulumiResourceNamePrefix {
    execute(): Promise<string>;
}

export const GetPulumiResourceNamePrefix = new Abstraction<IGetPulumiResourceNamePrefix>(
    "GetPulumiResourceNamePrefix"
);

export namespace GetPulumiResourceNamePrefix {
    export type Interface = IGetPulumiResourceNamePrefix;
}
