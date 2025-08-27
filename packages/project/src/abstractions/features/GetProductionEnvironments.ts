import { Abstraction } from "@webiny/di-container";

export interface IGetProductionEnvironments {
    execute(): Promise<string[]>;
}

export const GetProductionEnvironments = new Abstraction<IGetProductionEnvironments>(
    "GetProductionEnvironments"
);

export namespace GetProductionEnvironments {
    export type Interface = IGetProductionEnvironments;
}
