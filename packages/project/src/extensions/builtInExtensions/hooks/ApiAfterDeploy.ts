import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodTypes/zodPathToAbstraction.js";
import { ApiAfterDeploy } from "~/abstractions/index.js";
import { z } from "zod";

export const apiAfterDeploy = defineExtension({
    type: "Api/AfterDeploy",
    tags: { runtimeContext: "project", application: "api" },
    description: "Add custom logic to be executed after the API deployment process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(ApiAfterDeploy, project)
        });
    }
});
