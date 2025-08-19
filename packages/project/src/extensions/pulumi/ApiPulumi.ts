import { z } from "zod";
import { defineExtension, zodPathToAbstraction } from "~/extensions";
import { ApiPulumi } from "~/abstractions/features/pulumi/index.js";

export const apiPulumi = defineExtension({
    type: "Api/Pulumi",
    tags: { runtimeContext: "project", appName: "api" },
    description: "Modify Api app's cloud infrastructure using Pulumi.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(ApiPulumi)
    })
});
