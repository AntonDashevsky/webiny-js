import { z } from "zod";
import { defineExtension } from "~/extensions/defineExtension/index.js";

export const productionEnvironments = defineExtension({
    type: "Deployments/ProductionEnvironments",
    tags: { runtimeContext: "project" },
    description: "Provide names for environments that are considered production environments.",
    multiple: true,
    paramsSchema: z.object({
        environments: z.array(z.string())
    })
});
