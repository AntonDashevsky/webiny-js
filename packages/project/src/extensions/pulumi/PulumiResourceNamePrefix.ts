import { defineExtension } from "~/extensions/defineExtension/index.js";

export interface PulumiResourceNamePrefix {
    prefix: string;
}

export const pulumiResourceNamePrefix = defineExtension<PulumiResourceNamePrefix>({
    type: "Deployments/PulumiResourceNamePrefix",
    tags: { runtimeContext: "project" },
    description: 'Adjust the prefix for Pulumi resource names (default: "wby-").'
});
