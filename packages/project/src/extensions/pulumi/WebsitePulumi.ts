import { z } from "zod";
import { defineExtension, zodPathToAbstraction } from "~/extensions";
import { WebsitePulumi } from "~/abstractions/features/pulumi/index.js";

export const websitePulumi = defineExtension({
    type: "Website/Pulumi",
    tags: { runtimeContext: "project", appName: "website" },
    description: "Modify Website app's cloud infrastructure using Pulumi.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(WebsitePulumi)
    })
});
