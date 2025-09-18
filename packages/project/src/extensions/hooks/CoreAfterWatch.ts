import { defineExtension } from "~/defineExtension/index.js";
import { zodPathToAbstraction } from "~/defineExtension/zodTypes/zodPathToAbstraction.js";
import { CoreAfterWatch } from "~/abstractions/index.js";
import { z } from "zod";

export const coreAfterWatch = defineExtension({
    type: "Core/AfterWatch",
    tags: { runtimeContext: "project", application: "core" },
    description: "Add custom logic to be executed after the CORE watch process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(CoreAfterWatch, project)
        });
    }
});
