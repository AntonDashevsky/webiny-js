import { z } from "zod";
import { defineExtension } from "~/defineExtension/index.js";
import { zodPathToAbstraction } from "~/defineExtension/zodTypes/zodPathToAbstraction.js";
import { AdminPulumi } from "~/abstractions/features/pulumi/index.js";

export const adminPulumi = defineExtension({
    type: "Admin/Pulumi",
    tags: { runtimeContext: "project", appName: "admin" },
    description: "Modify Admin app's cloud infrastructure using Pulumi.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(AdminPulumi, project)
        });
    }
});
