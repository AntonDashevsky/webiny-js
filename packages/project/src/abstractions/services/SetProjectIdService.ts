import { Abstraction } from "@webiny/di-container";

interface ISetProjectIdService {
    execute(id: string): Promise<void>;
}

export const SetProjectIdService = new Abstraction<ISetProjectIdService>("SetProjectIdService");

export namespace SetProjectIdService {
    export type Interface = ISetProjectIdService;
}
