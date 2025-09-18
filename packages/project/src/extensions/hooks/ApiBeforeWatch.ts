import { defineExtension } from "~/defineExtension/index.js";
import { zodPathToAbstraction } from "~/defineExtension/zodTypes/zodPathToAbstraction.js";
import { ApiBeforeWatch } from "~/abstractions/index.js";
import { z } from "zod";

export const apiBeforeWatch = defineExtension({
    type: "Api/BeforeWatch",
    tags: { runtimeContext: "project", application: "api" },
    description: "Add custom logic to be executed before the API watch process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(ApiBeforeWatch, project)
        });
    }
});
