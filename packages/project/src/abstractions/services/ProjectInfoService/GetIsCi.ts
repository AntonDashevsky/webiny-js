import { Abstraction } from "@webiny/di-container";

interface IGetIsCi {
    execute(): boolean;
}

export const GetIsCi = new Abstraction<IGetIsCi>("GetIsCi");

export namespace GetIsCi {
    export interface Interface extends IGetIsCi {}
}