import { type CreateAdminPulumiAppParams } from "@webiny/pulumi-aws/enterprise/index.js";

export function createAdminApp(projectAppParams: CreateAdminPulumiAppParams = {}) {
    return {
        id: "admin",
        name: "Admin",
        description: "Your project's admin area.",
        async getPulumi() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { createAdminPulumiApp } = await import("@webiny/pulumi-aws/enterprise/index");

            return createAdminPulumiApp(projectAppParams);
        }
    };
}
