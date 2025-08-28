import { z } from "zod";
import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodTypes/zodPathToAbstraction.js";
import { ApiPulumi } from "~/abstractions/features/pulumi/index.js";

export const apiPulumi = defineExtension({
    type: "Api/Pulumi",
    tags: { runtimeContext: "project", appName: "api" },
    description: "Modify Api app's cloud infrastructure using Pulumi.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(ApiPulumi, project)
        });
    }
});
