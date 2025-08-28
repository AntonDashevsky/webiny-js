import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction.js";
import { CoreBeforeDeploy } from "~/abstractions/index.js";
import { z } from "zod";

export const coreBeforeDeploy = defineExtension({
    type: "Core/BeforeDeploy",
    tags: { runtimeContext: "project", application: "core" },
    description: "Add custom logic to be executed before the CORE deployment process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(CoreBeforeDeploy, project)
        });
    }
});
