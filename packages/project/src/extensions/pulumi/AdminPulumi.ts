import { z } from "zod";
import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction.js";
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
