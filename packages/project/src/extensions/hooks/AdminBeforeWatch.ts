import { defineExtension } from "~/defineExtension/index.js";
import { zodPathToAbstraction } from "~/defineExtension/zodTypes/zodPathToAbstraction.js";
import { AdminBeforeWatch } from "~/abstractions/index.js";
import { z } from "zod";

export const adminBeforeWatch = defineExtension({
    type: "Admin/BeforeWatch",
    tags: { runtimeContext: "project", application: "admin" },
    description: "Add custom logic to be executed before the Admin watch process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(AdminBeforeWatch, project)
        });
    }
});
