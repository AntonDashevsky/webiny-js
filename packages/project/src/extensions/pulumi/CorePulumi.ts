import { defineExtension } from "~/extensions/defineExtension/index.js";
import { CorePulumi } from "~/abstractions/features/pulumi/index.js";

export interface CorePulumiParams {
    src: string;
}

export const corePulumi = defineExtension<CorePulumiParams>({
    type: "Core/Pulumi",
    tags: { runtimeContext: "project", application: "core" },
    description: "Modify Core app's cloud infrastructure using Pulumi.",
    multiple: true,
    abstraction: CorePulumi
});
