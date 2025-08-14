import { defineExtension } from "~/extensions/defineExtension/index.js";

export interface AwsTagsParams {
    tags: Record<string, string>;
}

export const awsTags = defineExtension<AwsTagsParams>({
    type: "Deployments/AwsTags",
    tags: { runtimeContext: "project" },
    description: "Apply tags to AWS resources during deployment.",
    multiple: true
});
