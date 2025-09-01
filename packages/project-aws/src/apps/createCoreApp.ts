export { CoreOutput, configureAdminCognitoFederation } from "@webiny/pulumi-aws";

export function createCoreApp() {
    return {
        id: "core",
        name: "Core",
        description: "Your project's stateful cloud infrastructure resources.",
        async getPulumi() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { createCorePulumiApp } = await import("@webiny/pulumi-aws/enterprise/index.js");

            return createCorePulumiApp();
        }
    };
}
