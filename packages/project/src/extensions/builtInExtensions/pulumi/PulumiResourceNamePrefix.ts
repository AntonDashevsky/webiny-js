import { z } from "zod";
import { defineExtension } from "~/extensions/defineExtension/index.js";

export const pulumiResourceNamePrefix = defineExtension({
    type: "Infra/PulumiResourceNamePrefix",
    tags: { runtimeContext: "project" },
    description: 'Adjust the prefix for Pulumi resource names (default: "wby-").',
    paramsSchema: z.object({
        prefix: z.string()
    })
});
