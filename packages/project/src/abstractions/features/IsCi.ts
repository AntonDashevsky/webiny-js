import { Abstraction } from "@webiny/di-container";

interface IIsCi {
    execute(): boolean;
}

export const IsCi = new Abstraction<IIsCi>("IsCi");

export namespace IsCi {
    export type Interface = IIsCi;
}
