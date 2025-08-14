import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { CoreBeforeBuild } from "~/abstractions/index.js";

export interface CoreBeforeBuildParams {
    src: string;
}

export const coreBeforeBuild = defineExtension<CoreBeforeBuildParams>({
    type: "Core/BeforeBuild",
    tags: { runtimeContext: "project", application: "core" },
    description: "Add custom logic to be executed before the CORE build process.",
    multiple: true,
    abstraction: CoreBeforeBuild,
});
