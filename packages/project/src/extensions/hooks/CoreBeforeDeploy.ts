import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { CoreBeforeDeploy } from "~/abstractions/index.js";

export interface CoreBeforeDeployParams {
    src: string;
}

export const coreBeforeDeploy = defineExtension<CoreBeforeDeployParams>({
    type: "Core/BeforeDeploy",
    tags: { runtimeContext: "project", application: "core" },
    description: "Add custom logic to be executed before the CORE deployment process.",
    multiple: true,
    abstraction: CoreBeforeDeploy
});
