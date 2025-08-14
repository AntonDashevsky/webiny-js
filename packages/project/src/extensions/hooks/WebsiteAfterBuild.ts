import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { WebsiteAfterBuild } from "~/abstractions/index.js";

export interface WebsiteAfterBuildParams {
    src: string;
}

export const websiteAfterBuild = defineExtension<WebsiteAfterBuildParams>({
    type: "Website/AfterBuild",
    tags: { runtimeContext: "project", application: "website" },
    description: "Add custom logic to be executed after the Website build process.",
    multiple: true,
    abstraction: WebsiteAfterBuild,
});
