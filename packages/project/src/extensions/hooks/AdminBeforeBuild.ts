import { defineExtension } from "~/extensions/defineExtension/defineExtension.js";
import { AdminBeforeBuild } from "~/abstractions/index.js";

export interface AdminBeforeBuildParams {
    src: string;
}

export const adminBeforeBuild = defineExtension<AdminBeforeBuildParams>({
    type: "Admin/BeforeBuild",
    tags: { runtimeContext: "project", application: "admin" },
    description: "Add custom logic to be executed before the ADMIN build process.",
    multiple: true,
    abstraction: AdminBeforeBuild,
});
