import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction.js";
import { ApiBeforeBuild } from "~/abstractions/index.js";
import { z } from "zod";

export const apiBeforeBuild = defineExtension({
    type: "Api/BeforeBuild",
    tags: { runtimeContext: "project", application: "api" },
    description: "Add custom logic to be executed before the API build process.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(ApiBeforeBuild)
    })
});
