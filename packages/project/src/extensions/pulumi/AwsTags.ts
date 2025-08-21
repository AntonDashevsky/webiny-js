import { z } from "zod";
import { defineExtension } from "~/extensions/defineExtension/index.js";

export const awsTags = defineExtension({
    type: "Deployments/AwsTags",
    tags: { runtimeContext: "project" },
    description: "Apply tags to AWS resources during deployment.",
    multiple: true,
    paramsSchema: z.object({
        tags: z.record(z.string())
    })
});
