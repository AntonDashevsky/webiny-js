import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { CoreAfterDeploy } from "~/abstractions/index.js";

export interface CoreAfterDeployParams {
    src: string;
}

export const coreAfterDeploy = defineExtension<CoreAfterDeployParams>({
    type: "Core/AfterDeploy",
    tags: { runtimeContext: "project", application: "core" },
    description: "Add custom logic to be executed after the CORE deployment process.",
    multiple: true,
    abstraction: CoreAfterDeploy
});
