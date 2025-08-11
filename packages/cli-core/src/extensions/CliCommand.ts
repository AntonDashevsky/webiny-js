import { createExtension } from "@webiny/project/extensions";
import { Command } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const cliCommand = createExtension<CliCommandParams>({
    type: "Cli/Command",
    scopes: ["cli"],
    description: "An extension for defining CLI commands.",
    array: true,
    abstraction: Command,
});
