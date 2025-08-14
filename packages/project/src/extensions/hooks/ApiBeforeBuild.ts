import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { ApiBeforeBuild } from "~/abstractions/index.js";

export interface ApiBeforeBuildParams {
    src: string;
}

export const apiBeforeBuild = defineExtension<ApiBeforeBuildParams>({
    type: "Api/BeforeBuild",
    tags: { runtimeContext: "project", application: "api" },
    description: "Add custom logic to be executed before the API build process.",
    multiple: true,
    abstraction: ApiBeforeBuild,
});
