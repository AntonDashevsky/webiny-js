import { defineExtension, zodPathToAbstraction } from "@webiny/project/extensions/index.js";
import { Command } from "~/abstractions/index.js";
import { z } from "zod";

export const cliCommandDecorator = defineExtension({
    type: "cliCommandDecorator",
    tags: { runtimeContext: "cli" },
    description: "Decorates an existing CLI command.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(Command)
    })
});
