import { createExtension } from "./createExtension/createExtension.js";
import { WebsiteAfterDeploy } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const websiteAfterDeploy = createExtension<CliCommandParams>({
    type: "Website/AfterDeploy",
    scopes: ["project"],
    description: "Add custom logic to be executed after the WEBSITE deployment process.",
    array: true,
    abstraction: WebsiteAfterDeploy
});
