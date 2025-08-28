import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodTypes/zodPathToAbstraction.js";
import { CoreAfterDeploy } from "~/abstractions/index.js";
import { z } from "zod";

export const coreAfterDeploy = defineExtension({
    type: "Core/AfterDeploy",
    tags: { runtimeContext: "project", application: "core" },
    description: "Add custom logic to be executed after the CORE deployment process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(CoreAfterDeploy, project)
        });
    }
});
