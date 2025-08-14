import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { CoreAfterBuild } from "~/abstractions/index.js";

export interface CoreAfterBuildParams {
    src: string;
}

export const coreAfterBuild = defineExtension<CoreAfterBuildParams>({
    type: "Core/AfterBuild",
    tags: { runtimeContext: "project", application: "core" },
    description: "Add custom logic to be executed after the CORE build process.",
    multiple: true,
    abstraction: CoreAfterBuild,
});
