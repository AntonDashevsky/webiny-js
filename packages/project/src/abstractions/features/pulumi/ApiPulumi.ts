import { Abstraction } from "@webiny/di-container";

export interface IApiPulumi<TApp> {
    execute(app: TApp): void | Promise<void>;
}

export const ApiPulumi = new Abstraction<IApiPulumi<unknown>>("ApiPulumi");

export namespace ApiPulumi {
    export type Interface = IApiPulumi<unknown>;
    export type Params = unknown;
}
