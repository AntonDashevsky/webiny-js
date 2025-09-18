import { defineExtension } from "~/defineExtension/index.js";
import { zodPathToAbstraction } from "~/defineExtension/zodTypes/zodPathToAbstraction.js";
import { ApiAfterWatch } from "~/abstractions/index.js";
import { z } from "zod";

export const apiAfterWatch = defineExtension({
    type: "Api/AfterWatch",
    tags: { runtimeContext: "project", application: "api" },
    description: "Add custom logic to be executed after the API watch process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(ApiAfterWatch, project)
        });
    }
});
