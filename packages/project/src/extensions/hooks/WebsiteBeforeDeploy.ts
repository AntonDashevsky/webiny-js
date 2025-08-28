import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodTypes/zodPathToAbstraction.js";
import { WebsiteBeforeDeploy } from "~/abstractions/index.js";
import { z } from "zod";

export const websiteBeforeDeploy = defineExtension({
    type: "Website/BeforeDeploy",
    tags: { runtimeContext: "project", application: "website" },
    description: "Add custom logic to be executed before the Website deployment process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(WebsiteBeforeDeploy, project)
        });
    }
});
