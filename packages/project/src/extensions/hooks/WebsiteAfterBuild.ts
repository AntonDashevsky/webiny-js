import { defineExtension } from "~/extensions/defineExtension/index.js";
import { zodPathToAbstraction } from "~/extensions/zodPathToAbstraction.js";
import { WebsiteAfterBuild } from "~/abstractions/index.js";
import { z } from "zod";

export const websiteAfterBuild = defineExtension({
    type: "Website/AfterBuild",
    tags: { runtimeContext: "project", application: "website" },
    description: "Add custom logic to be executed after the Website build process.",
    multiple: true,
    paramsSchema: z.object({
        src: zodPathToAbstraction(WebsiteAfterBuild)
    })
});
