import { Abstraction } from "@webiny/di-container";

export interface IGetCliRunnerService {
    execute(): any;
}

export const GetCliRunnerService = new Abstraction<IGetCliRunnerService>("GetCliRunnerService");

export namespace GetCliRunnerService {
    export type Interface = IGetCliRunnerService;
}