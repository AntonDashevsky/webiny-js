import { createExtension } from "./createExtension/createExtension.js";
import { WebsiteAfterBuild } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const websiteAfterBuild = createExtension<CliCommandParams>({
    type: "Website/AfterBuild",
    scopes: ["project"],
    description: "Add custom logic to be executed after the WEBSITE build process.",
    array: true,
    abstraction: WebsiteAfterBuild,
});
