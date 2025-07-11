import { cliCommand } from "./CliCommand.js";
import { cliCommandDecorator } from "~/extensions/CliCommandDecorator";

export const Cli = {
    Command: cliCommand.ReactComponent,
    CommandDecorator: cliCommandDecorator.ReactComponent
};

export const definitions = [cliCommand.definition, cliCommandDecorator.definition];
