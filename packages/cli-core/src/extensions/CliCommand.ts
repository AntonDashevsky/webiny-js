import { defineExtension, zodPathToAbstraction } from "@webiny/project/extensions";
import { Command } from "~/abstractions/index.js";
import { z } from "zod";

export const cliCommand = defineExtension({
    type: "Cli/Command",
    tags: { runtimeContext: "cli" },
    description: "An extension for defining CLI commands.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(Command)
    })
});
