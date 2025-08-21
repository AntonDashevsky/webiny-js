import { defineExtension } from "~/extensions/defineExtension/index.js";
import { z } from "zod";
import { zodPathToFile } from "~/extensions/zodPathToFile.js";
import { CorePulumi } from "~/abstractions/index.js";

export const projectDecorator = defineExtension({
    type: "Project/Decorator",
    tags: { runtimeContext: "project" },
    description: "Decorate an existing implementation with additional functionality.",
    paramsSchema: z.object({
        src: zodPathToFile()
    })
});
