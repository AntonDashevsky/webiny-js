import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction.js";
import { WebsiteAfterDeploy } from "~/abstractions/index.js";
import { z } from "zod";

export const websiteAfterDeploy = defineExtension({
    type: "Website/AfterDeploy",
    tags: { runtimeContext: "project", application: "website" },
    description: "Add custom logic to be executed after the WEBSITE deployment process.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(WebsiteAfterDeploy)
    })
});
