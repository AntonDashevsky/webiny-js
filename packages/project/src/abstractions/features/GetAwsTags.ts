import { Abstraction } from "@webiny/di-container";

export interface IGetAwsTags {
    execute(): Promise<Record<string, string>>;
}

export const GetAwsTags = new Abstraction<IGetAwsTags>("GetAwsTags");

export namespace GetAwsTags {
    export type Interface = IGetAwsTags;
}
