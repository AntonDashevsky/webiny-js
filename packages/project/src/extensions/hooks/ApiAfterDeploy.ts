import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { ApiAfterDeploy } from "~/abstractions/index.js";

export interface ApiAfterDeployParams {
    src: string;
}

export const apiAfterDeploy = defineExtension<ApiAfterDeployParams>({
    type: "Api/AfterDeploy",
    tags: { runtimeContext: "project", application: "api" },
    description: "Add custom logic to be executed after the API deployment process.",
    multiple: true,
    abstraction: ApiAfterDeploy
});
