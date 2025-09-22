import { defineExtension } from "~/defineExtension/index.js";
import { zodPathToAbstraction } from "~/defineExtension/zodTypes/zodPathToAbstraction.js";
import { AfterDeploy } from "~/abstractions/index.js";
import { z } from "zod";

export const afterDeploy = defineExtension({
    type: "Project/AfterDeploy",
    tags: { runtimeContext: "project" },
    description: "Add custom logic to be executed after the PROJECT deploy process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(AfterDeploy, project)
        });
    }
});
