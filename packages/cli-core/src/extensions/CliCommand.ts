import { defineExtension } from "@webiny/project/extensions";
import { Command } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const cliCommand = defineExtension<CliCommandParams>({
    type: "Cli/Command",
    tags: { runtimeContext: "cli" },
    description: "An extension for defining CLI commands.",
    multiple: true,
    abstraction: Command
});
