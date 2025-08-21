import { z } from "zod";
import { defineExtension } from "~/extensions/defineExtension";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction";
import { CorePulumi } from "~/abstractions/features/pulumi/index.js";

export const corePulumi = defineExtension({
    type: "Core/Pulumi",
    tags: { runtimeContext: "project", appName: "core" },
    description: "Modify Core app's cloud infrastructure using Pulumi.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(CorePulumi)
    })
});
