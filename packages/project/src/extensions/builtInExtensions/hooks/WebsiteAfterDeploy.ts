import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodTypes/zodPathToAbstraction.js";
import { WebsiteAfterDeploy } from "~/abstractions/index.js";
import { z } from "zod";

export const websiteAfterDeploy = defineExtension({
    type: "Website/AfterDeploy",
    tags: { runtimeContext: "project", application: "website" },
    description: "Add custom logic to be executed after the WEBSITE deployment process.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToAbstraction(WebsiteAfterDeploy, project)
        });
    }
});
