import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodTypes/zodPathToAbstraction.js";
import { WebsiteBeforeBuild } from "~/abstractions/index.js";
import { z } from "zod";

export const websiteBeforeBuild = defineExtension({
    type: "Website/BeforeBuild",
    tags: { runtimeContext: "project", application: "website" },
    description: "Add custom logic to be executed before the Website build process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(WebsiteBeforeBuild, project)
        });
    }
});
