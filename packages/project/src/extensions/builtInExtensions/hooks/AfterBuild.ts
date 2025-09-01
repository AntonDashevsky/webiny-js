import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodTypes/zodPathToAbstraction.js";
import { AfterBuild } from "~/abstractions/index.js";
import { z } from "zod";

export const afterBuild = defineExtension({
    type: "Project/AfterBuild",
    tags: { runtimeContext: "project" },
    description: "Add custom logic to be executed after the PROJECT build process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(AfterBuild, project)
        });
    }
});
