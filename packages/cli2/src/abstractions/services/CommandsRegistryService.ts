import { Abstraction } from "@webiny/di-container";
import { Command } from "~/abstractions/index.js";

export interface ICommandsRegistryService {
    execute(): Command.Interface[];
}

export const CommandsRegistryService = new Abstraction<ICommandsRegistryService>("CommandsRegistryService");

export namespace CommandsRegistryService {
    export type Interface = ICommandsRegistryService;
}