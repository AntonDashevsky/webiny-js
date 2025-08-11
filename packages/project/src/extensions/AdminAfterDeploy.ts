import { createExtension } from "./createExtension/createExtension.js";
import { AdminAfterDeploy } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const adminAfterDeploy = createExtension<CliCommandParams>({
    type: "Admin/AfterDeploy",
    scopes: ["project"],
    description: "Add custom logic to be executed after the ADMIN deployment process.",
    array: true,
    abstraction: AdminAfterDeploy
});
