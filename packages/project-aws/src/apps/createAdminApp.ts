export function createAdminApp() {
    return {
        id: "admin",
        name: "Admin",
        description: "Your project's admin area.",
        async getPulumi() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { createAdminPulumiApp } = await import("@webiny/pulumi-aws/index.js");

            return createAdminPulumiApp();
        }
    };
}
