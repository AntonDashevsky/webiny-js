import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { WebsiteBeforeDeploy } from "~/abstractions/index.js";

export interface WebsiteBeforeDeployParams {
    src: string;
}

export const websiteBeforeDeploy = defineExtension<WebsiteBeforeDeployParams>({
    type: "Website/BeforeDeploy",
    tags: { runtimeContext: "project", application: "website" },
    description: "Add custom logic to be executed before the WEBSITE deployment process.",
    multiple: true,
    abstraction: WebsiteBeforeDeploy
});
