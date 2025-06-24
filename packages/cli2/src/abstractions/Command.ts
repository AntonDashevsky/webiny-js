import { Abstraction } from "@webiny/di-container";

export interface CommandDefinition {
    name: string;
    description?: string;
    options?: Array<{
        describe: string;
        type: string;
        default?: any;
    }>;
    handler: (args: Record<string, any>) => Promise<void>;
}

export interface ICommand {
    getDefinition(): CommandDefinition;
    execute(): Promise<void>;
}

export const CommandAbstraction = new Abstraction<ICommand>("Command");
