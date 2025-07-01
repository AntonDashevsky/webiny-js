import { Abstraction } from "@webiny/di-container";

export interface ICommandOptionDefinition {
    name: string;
    description: string;
    type: string;
    default?: any;
}

export interface ICommandDefinition {
    name: string;
    description: string;
    options?: ICommandOptionDefinition[];
    handler: (args: any) => Promise<void>;
}

export interface ICommand {
    execute(): ICommandDefinition;
}

export const Command = new Abstraction<ICommand>("Command");

export namespace Command {
    export type Interface = ICommand;
}
