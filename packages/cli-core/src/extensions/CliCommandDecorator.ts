import { defineExtension } from "@webiny/project/extensions";
import { Command } from "~/abstractions/index.js";

export interface CliCommandDecoratorParams {
    name: string;
    src: string;
}

export const cliCommandDecorator = defineExtension<CliCommandDecoratorParams>({
    type: "cliCommandDecorator",
    tags: { runtimeContext: "cli" },
    description: "Decorates an existing CLI command.",
    multiple: true,
    abstraction: Command
});
