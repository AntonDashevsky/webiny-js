import { createExtension } from "./createExtension/createExtension.js";
import { AdminBeforeBuild } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const adminBeforeBuild = createExtension<CliCommandParams>({
    type: "Admin/BeforeBuild",
    scopes: ["project"],
    description: "Add custom logic to be executed before the ADMIN build process.",
    array: true,
    abstraction: AdminBeforeBuild,
});
