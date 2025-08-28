import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodTypes/zodPathToAbstraction.js";
import { CoreBeforeBuild } from "~/abstractions/index.js";
import { z } from "zod";

export const coreBeforeBuild = defineExtension({
    type: "Core/BeforeBuild",
    tags: { runtimeContext: "project", application: "core" },
    description: "Add custom logic to be executed before the CORE build process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(CoreBeforeBuild, project)
        });
    }
});
