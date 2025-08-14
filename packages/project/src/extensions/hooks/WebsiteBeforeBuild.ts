import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { WebsiteBeforeBuild } from "~/abstractions/index.js";

export interface WebsiteBeforeBuildParams {
    src: string;
}

export const websiteBeforeBuild = defineExtension<WebsiteBeforeBuildParams>({
    type: "Website/BeforeBuild",
    tags: { runtimeContext: "project", application: "website" },
    description: "Add custom logic to be executed before the WEBSITE build process.",
    multiple: true,
    abstraction: WebsiteBeforeBuild,
});
