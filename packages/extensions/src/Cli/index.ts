import { createConfigurableComponent } from "@webiny/react-properties";
import { cliCommand } from "./CliCommand.js";

const base = createConfigurableComponent("Cli");

export const Cli = Object.assign(base.Config, {
    Command: cliCommand.ReactComponent
});

export const definitions = [
    cliCommand.Definition
]