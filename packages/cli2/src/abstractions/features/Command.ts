import { Abstraction } from "@webiny/di-container";

export interface ICommandDefinition {
    name: string;
    description?: string;
}

export interface ICommand<TParams = void, TResult = void> {
    execute(params: TParams): Promise<TResult>;

    getDefinition(): ICommandDefinition
}

export const Command = new Abstraction<ICommand>("Command");

export namespace Command {
    export type Interface<TParams = void, TResult = void> = ICommand<TParams, TResult>;
}
