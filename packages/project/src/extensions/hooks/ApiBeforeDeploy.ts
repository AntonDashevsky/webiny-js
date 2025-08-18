import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction.js";
import { ApiBeforeDeploy } from "~/abstractions/index.js";
import { z } from "zod";

export const apiBeforeDeploy = defineExtension({
    type: "Api/BeforeDeploy",
    tags: { runtimeContext: "project", application: "api" },
    description: "Add custom logic to be executed before the API deployment process.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(ApiBeforeDeploy)
    })
});
