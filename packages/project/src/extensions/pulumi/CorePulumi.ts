import { z } from "zod";
import { defineExtension, zodPathToAbstraction } from "~/extensions";
import { CorePulumi } from "~/abstractions/features/pulumi/index.js";

export const corePulumi = defineExtension({
    type: "Core/Pulumi",
    tags: { runtimeContext: "project", application: "core" },
    description: "Modify Core app's cloud infrastructure using Pulumi.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(CorePulumi)
    })
    // abstraction: CorePulumi
});
