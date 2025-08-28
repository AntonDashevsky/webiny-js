import { createImplementation } from "@webiny/di-container";
import { GetAwsTags, GetProjectConfigService } from "~/abstractions/index.js";
import { awsTags } from "~/extensions/builtInExtensions/pulumi/AwsTags.js";

export class DefaultGetAwsTags implements GetAwsTags.Interface {
    constructor(private getProjectConfigService: GetProjectConfigService.Interface) {}

    async execute() {
        const projectConfig = await this.getProjectConfigService.execute();

        return projectConfig.extensionsByType(awsTags).reduce<Record<string, any>>((acc, ext) => {
            return { ...acc, ...ext.params.tags };
        }, {});
    }
}

export const getAwsTags = createImplementation({
    abstraction: GetAwsTags,
    implementation: DefaultGetAwsTags,
    dependencies: [GetProjectConfigService]
});
