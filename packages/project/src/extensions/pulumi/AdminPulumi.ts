import { z } from "zod";
import { defineExtension, zodPathToAbstraction } from "~/extensions";
import { AdminPulumi } from "~/abstractions/features/pulumi/index.js";

export const adminPulumi = defineExtension({
    type: "Admin/Pulumi",
    tags: { runtimeContext: "project", appName: "admin" },
    description: "Modify Admin app's cloud infrastructure using Pulumi.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(AdminPulumi)
    })
});
