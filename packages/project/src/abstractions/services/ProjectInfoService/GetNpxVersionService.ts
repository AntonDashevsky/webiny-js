import { Abstraction } from "@webiny/di-container";

interface IGetNpxVersionService {
    execute(): string;
}

export const GetNpxVersionService = new Abstraction<IGetNpxVersionService>("GetNpxVersionService");

export namespace GetNpxVersionService {
    export type Interface = IGetNpxVersionService;
}
