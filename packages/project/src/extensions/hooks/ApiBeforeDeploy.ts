import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { ApiBeforeDeploy } from "~/abstractions/index.js";

export interface ApiBeforeDeployParams {
    src: string;
}

export const apiBeforeDeploy = defineExtension<ApiBeforeDeployParams>({
    type: "Api/BeforeDeploy",
    tags: { runtimeContext: "project", application: "api" },
    description: "Add custom logic to be executed before the API deployment process.",
    multiple: true,
    abstraction: ApiBeforeDeploy
});
