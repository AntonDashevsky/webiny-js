import { defineExtension } from "./defineExtension/defineExtension.js";
import { z } from "zod";

export const telemetry = defineExtension({
    type: "Project/Telemetry",
    tags: { runtimeContext: "project" },
    description: "This extension allows you to enable or disable telemetry for the project.",
    paramsSchema: z.object({
        enabled: z.boolean().default(true)
    })
});
