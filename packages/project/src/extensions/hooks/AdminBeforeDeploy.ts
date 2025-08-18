import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction.js";
import { AdminBeforeDeploy } from "~/abstractions/index.js";
import { z } from "zod";

export const adminBeforeDeploy = defineExtension({
    type: "Admin/BeforeDeploy",
    tags: { runtimeContext: "project", application: "admin" },
    description: "Add custom logic to be executed before the ADMIN deployment process.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(AdminBeforeDeploy)
    })
});
