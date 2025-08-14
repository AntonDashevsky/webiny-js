import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { AdminAfterBuild } from "~/abstractions/index.js";

export interface AdminAfterBuildParams {
    src: string;
}

export const adminAfterBuild = defineExtension<AdminAfterBuildParams>({
    type: "Admin/AfterBuild",
    tags: { runtimeContext: "project", application: "admin" },
    description: "Add custom logic to be executed after the ADMIN build process.",
    multiple: true,
    abstraction: AdminAfterBuild
});
