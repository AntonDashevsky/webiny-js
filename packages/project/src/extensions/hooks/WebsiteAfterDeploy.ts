import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { WebsiteAfterDeploy } from "~/abstractions/index.js";

export interface WebsiteAfterDeployParams {
    src: string;
}

export const websiteAfterDeploy = defineExtension<WebsiteAfterDeployParams>({
    type: "Website/AfterDeploy",
    tags: { runtimeContext: "project", application: "website" },
    description: "Add custom logic to be executed after the WEBSITE deployment process.",
    multiple: true,
    abstraction: WebsiteAfterDeploy
});
