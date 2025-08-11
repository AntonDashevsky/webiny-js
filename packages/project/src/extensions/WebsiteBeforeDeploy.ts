import { createExtension } from "./createExtension/createExtension.js";
import { WebsiteBeforeDeploy } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const websiteBeforeDeploy = createExtension<CliCommandParams>({
    type: "Website/BeforeDeploy",
    scopes: ["project"],
    description: "Add custom logic to be executed before the WEBSITE deployment process.",
    array: true,
    abstraction: WebsiteBeforeDeploy,
});
