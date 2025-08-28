import { defineExtension } from "~/extensions/defineExtension/index.js";
import { z } from "zod";
import { zodPathToFile } from "~/extensions/zodTypes/zodPathToFile.js";

export const projectDecorator = defineExtension({
    type: "Project/Decorator",
    tags: { runtimeContext: "project" },
    description: "Decorate an existing implementation with additional functionality.",
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToFile(project)
        });
    }
});
