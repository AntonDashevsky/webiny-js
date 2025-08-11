import { createExtension } from "./createExtension/createExtension.js";
import { AdminBeforeDeploy } from "~/abstractions/index.js";

export interface CliCommandParams {
    name: string;
    src: string;
}

export const adminBeforeDeploy = createExtension<CliCommandParams>({
    type: "Admin/BeforeDeploy",
    scopes: ["project"],
    description: "Add custom logic to be executed before the ADMIN deployment process.",
    array: true,
    abstraction: AdminBeforeDeploy,
});
