import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction.js";
import { AdminBeforeBuild } from "~/abstractions/index.js";
import { z } from "zod";

export const adminBeforeBuild = defineExtension({
    type: "Admin/BeforeBuild",
    tags: { runtimeContext: "project", application: "admin" },
    description: "Add custom logic to be executed before the ADMIN build process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(AdminBeforeBuild, project)
        });
    }
});
