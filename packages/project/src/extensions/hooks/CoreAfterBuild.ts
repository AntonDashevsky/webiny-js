import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodTypes/zodPathToAbstraction.js";
import { CoreAfterBuild } from "~/abstractions/index.js";
import { z } from "zod";

export const coreAfterBuild = defineExtension({
    type: "Core/AfterBuild",
    tags: { runtimeContext: "project", application: "core" },
    description: "Add custom logic to be executed after the CORE build process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(CoreAfterBuild, project)
        });
    }
});
