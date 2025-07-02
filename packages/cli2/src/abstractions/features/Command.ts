import { Abstraction } from "@webiny/di-container";

export interface ICommandParamDefinition {
    name: string;
    description: string;
    type: string;
    required?: boolean;
    default?: any;
}

export interface ICommandOptionDefinition {
    name: string;
    description: string;
    type: string;
    required?: boolean;
    default?: any;
}

export interface ICommandDefinition<THandlerParams> {
    name: string;
    description: string;
    params?: ICommandParamDefinition[];
    options?: ICommandOptionDefinition[];
    examples?: string[];
    handler: (params: THandlerParams) => void | Promise<void>;
}

export interface ICommand<THandlerParams> {
    execute(): ICommandDefinition<THandlerParams>;
}

export const Command = new Abstraction("Command");

export namespace Command {
    export type Interface<THandlerParams> = ICommand<THandlerParams>;

    export type ParamDefinition = ICommandParamDefinition;
    export type OptionDefinition = ICommandOptionDefinition;
}
