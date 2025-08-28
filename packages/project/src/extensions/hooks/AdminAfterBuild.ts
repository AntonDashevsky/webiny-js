import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction.js";
import { AdminAfterBuild } from "~/abstractions/index.js";
import { z } from "zod";

export const adminAfterBuild = defineExtension({
    type: "Admin/AfterBuild",
    tags: { runtimeContext: "project", application: "admin" },
    description: "Add custom logic to be executed after the ADMIN build process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(AdminAfterBuild, project)
        });
    }
});
