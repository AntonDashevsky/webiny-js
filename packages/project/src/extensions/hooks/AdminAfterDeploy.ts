import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction.js";
import { AdminAfterDeploy } from "~/abstractions/index.js";
import { z } from "zod";

export const adminAfterDeploy = defineExtension({
    type: "Admin/AfterDeploy",
    tags: { runtimeContext: "project", application: "admin" },
    description: "Add custom logic to be executed after the ADMIN deployment process.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(AdminAfterDeploy)
    })
});
