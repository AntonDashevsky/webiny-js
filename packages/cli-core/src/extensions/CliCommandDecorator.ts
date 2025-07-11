import { createExtension } from "@webiny/project/extensions";
import { Command } from "~/abstractions/index.js";

export interface CliCommandDecoratorParams {
    name: string;
    src: string;
}

export const cliCommandDecorator = createExtension<CliCommandDecoratorParams>({
    type: "cliCommandDecorator",
    description: "Decorates an existing CLI command.",
    array: true,
    abstraction: Command,
});
