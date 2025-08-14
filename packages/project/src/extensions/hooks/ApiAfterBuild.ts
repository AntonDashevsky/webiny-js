import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { ApiAfterBuild } from "~/abstractions/index.js";

export interface ApiAfterBuildParams {
    src: string;
}

export const apiAfterBuild = defineExtension<ApiAfterBuildParams>({
    type: "Api/AfterBuild",
    tags: { runtimeContext: "project", application: "api" },
    description: "Add custom logic to be executed after the API build process.",
    multiple: true,
    abstraction: ApiAfterBuild,
});
