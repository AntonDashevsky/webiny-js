import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { AdminBeforeDeploy } from "~/abstractions/index.js";

export interface AdminBeforeDeployParams {
    src: string;
}

export const adminBeforeDeploy = defineExtension<AdminBeforeDeployParams>({
    type: "Admin/BeforeDeploy",
    tags: { runtimeContext: "project", application: "admin" },
    description: "Add custom logic to be executed before the ADMIN deployment process.",
    multiple: true,
    abstraction: AdminBeforeDeploy,
});
