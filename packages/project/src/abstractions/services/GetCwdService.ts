import { Abstraction } from "@webiny/di-container";

export interface IGetCwdService {
    execute(): string;
}

export const GetCwdService = new Abstraction<IGetCwdService>("GetCwdService");

export namespace GetCwdService {
    export type Interface = IGetCwdService;
}
