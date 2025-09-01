import { type CreateWebsitePulumiAppParams } from "@webiny/pulumi-aws/enterprise/index.js";

export function createWebsiteApp(projectAppParams: CreateWebsitePulumiAppParams = {}) {
    return {
        id: "website",
        name: "Website",
        description: "Your project's public website.",
        cli: {
            // Default args for the "yarn webiny watch ..." command (we don't need the deploy option while developing).
            watch: {
                // We disable local development for all AWS Lambda functions.
                // This can be changed down the line by passing another set of values
                // to the "watch" command (for example `-f ps-render-subscriber`).
                function: "none"
            }
        },
        async getPulumi() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { createWebsitePulumiApp } = await import("@webiny/pulumi-aws/enterprise/index");

            return createWebsitePulumiApp(projectAppParams);
        }
        // plugins: [builtInPlugins, customPlugins]
    };
}
