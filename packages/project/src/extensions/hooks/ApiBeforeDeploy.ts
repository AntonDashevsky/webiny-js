import { defineExtension } from "~/defineExtension/index.js";
import { zodPathToAbstraction } from "~/defineExtension/zodTypes/zodPathToAbstraction.js";
import { ApiBeforeDeploy } from "~/abstractions/index.js";
import { z } from "zod";

export const apiBeforeDeploy = defineExtension({
    type: "Api/BeforeDeploy",
    tags: { runtimeContext: "project", application: "api" },
    description: "Add custom logic to be executed before the API deployment process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(ApiBeforeDeploy, project)
        });
    }
});
