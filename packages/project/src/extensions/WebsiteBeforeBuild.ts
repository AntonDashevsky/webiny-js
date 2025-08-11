import { createExtension } from "./createExtension/createExtension.js";
import { WebsiteBeforeBuild } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const websiteBeforeBuild = createExtension<CliCommandParams>({
    type: "Website/BeforeBuild",
    scopes: ["project"],
    description: "Add custom logic to be executed before the WEBSITE build process.",
    array: true,
    abstraction: WebsiteBeforeBuild,
});
