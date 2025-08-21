import { cliCommand } from "./CliCommand.js";
import { cliCommandDecorator } from "~/extensions/CliCommandDecorator.js";

export const CliCommand = cliCommand.ReactComponent;

export const definitions = [cliCommand.definition, cliCommandDecorator.definition];
