import { defineExtension } from "~/extensions/defineExtension";
import { z } from "zod";
import { zodPathToFile } from "~/extensions/zodPathToFile";
import { CorePulumi } from "~/abstractions";

export const projectDecorator = defineExtension({
    type: "Project/Decorator",
    tags: { runtimeContext: "project" },
    description: "Decorate an existing implementation with additional functionality.",
    paramsSchema: z.object({
        src: zodPathToFile()
    })
});
