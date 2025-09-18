import { defineExtension } from "~/defineExtension/index.js";
import { zodPathToAbstraction } from "~/defineExtension/zodTypes/zodPathToAbstraction.js";
import { BeforeWatch } from "~/abstractions/index.js";
import { z } from "zod";

export const beforeWatch = defineExtension({
    type: "Project/BeforeWatch",
    tags: { runtimeContext: "project" },
    description: "Add custom logic to be executed before the project watch process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(BeforeWatch, project)
        });
    }
});
