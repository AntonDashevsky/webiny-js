import { Abstraction } from "@webiny/di-container";

interface ISetProjectIdServiceOptions {
    force?: boolean;
}

interface ISetProjectIdService {
    execute(id: string, options: ISetProjectIdServiceOptions): Promise<void>;
}

export const SetProjectIdService = new Abstraction<ISetProjectIdService>("SetProjectIdService");

export namespace SetProjectIdService {
    export type Interface = ISetProjectIdService;
    export type Options = ISetProjectIdServiceOptions;
}
