import { z } from "zod";
import { defineExtension } from "~/extensions/defineExtension/index.js";

const paramsSchema = z.object({
    tags: z.record(z.string())
});

export const awsTags = defineExtension<typeof paramsSchema>({
    type: "Deployments/AwsTags",
    tags: { runtimeContext: "project" },
    description: "Apply tags to AWS resources during deployment.",
    multiple: true,
    paramsSchema
});
