import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction.js";
import { WebsiteBeforeDeploy } from "~/abstractions/index.js";
import { z } from "zod";

export const websiteBeforeDeploy = defineExtension({
    type: "Website/BeforeDeploy",
    tags: { runtimeContext: "project", application: "website" },
    description: "Add custom logic to be executed before the Website deployment process.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(WebsiteBeforeDeploy)
    })
});
