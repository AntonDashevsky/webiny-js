import { Abstraction } from "@webiny/di-container";
import { ExtensionDefinitionModel } from "@webiny/project/extensions";

export interface ICliParams {
    cwd?: string;
    extensions?: ExtensionDefinitionModel[]
}

export interface ICliParamsService {
    get(): ICliParams
    set(params: ICliParams): void
}

export const CliParamsService = new Abstraction<ICliParamsService>("CliParamsService");

export namespace CliParamsService {
    export type Interface = ICliParamsService;
    export type Params = ICliParams;
}