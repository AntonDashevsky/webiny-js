import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction.js";
import { ApiAfterBuild } from "~/abstractions/index.js";
import { z } from "zod";

export const apiAfterBuild = defineExtension({
    type: "Api/AfterBuild",
    tags: { runtimeContext: "project", application: "api" },
    description: "Add custom logic to be executed after the API build process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(ApiAfterBuild, project)
        });
    }
});
