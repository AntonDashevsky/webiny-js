import { defineExtension } from "~/defineExtension/index.js";
import { zodPathToAbstraction } from "~/defineExtension/zodTypes/zodPathToAbstraction.js";
import { AdminAfterWatch } from "~/abstractions/index.js";
import { z } from "zod";

export const adminAfterWatch = defineExtension({
    type: "Admin/AfterWatch",
    tags: { runtimeContext: "project", application: "admin" },
    description: "Add custom logic to be executed after the ADMIN watch process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(AdminAfterWatch, project)
        });
    }
});
