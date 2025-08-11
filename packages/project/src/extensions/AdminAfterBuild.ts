import { createExtension } from "./createExtension/createExtension.js";
import { AdminAfterBuild } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const adminAfterBuild = createExtension<CliCommandParams>({
    type: "Admin/AfterBuild",
    scopes: ["project"],
    description: "Add custom logic to be executed after the ADMIN build process.",
    array: true,
    abstraction: AdminAfterBuild,
});
