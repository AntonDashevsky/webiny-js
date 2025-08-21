import { z } from "zod";
import { defineExtension } from "~/extensions/defineExtension";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction";
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
