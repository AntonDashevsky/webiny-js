import { type CreateApiPulumiAppParams } from "@webiny/pulumi-aws/enterprise/index.js";

export { ApiOutput } from "@webiny/pulumi-aws";

export function createApiApp(projectAppParams: CreateApiPulumiAppParams = {}) {
    return {
        id: "api",
        name: "API",
        description:
            "Represents cloud infrastructure needed for supporting your project's (GraphQL) API.",
        cli: {
            // Default args for the "yarn webiny watch ..." command.
            watch: {
                // By default, we only enable local development for the "graphql" function.
                // This can be changed down the line by passing another set of values
                // to the "watch" command.
                function: "graphql"
            }
        },
        async getPulumi() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { createApiPulumiApp } = await import("@webiny/pulumi-aws/enterprise/index");

            return createApiPulumiApp(projectAppParams);
        }
    };
}
