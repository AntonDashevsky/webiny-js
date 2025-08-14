import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { AdminAfterDeploy } from "~/abstractions/index.js";

export interface AdminAfterDeployParams {
    src: string;
}

export const adminAfterDeploy = defineExtension<AdminAfterDeployParams>({
    type: "Admin/AfterDeploy",
    tags: { runtimeContext: "project", application: "admin" },
    description: "Add custom logic to be executed after the ADMIN deployment process.",
    multiple: true,
    abstraction: AdminAfterDeploy
});
