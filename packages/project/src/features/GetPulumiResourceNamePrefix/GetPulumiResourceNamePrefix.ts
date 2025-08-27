import { createImplementation } from "@webiny/di-container";
import { GetProjectConfigService, GetPulumiResourceNamePrefix } from "~/abstractions";
import { pulumiResourceNamePrefix as pulumiResourceNamePrefixExtension } from "~/extensions/pulumi";

export class DefaultGetPulumiResourceNamePrefix implements GetPulumiResourceNamePrefix.Interface {
    constructor(private getProjectConfigService: GetProjectConfigService.Interface) {}
    async execute() {
        const projectConfig = await this.getProjectConfigService.execute();

        let pulumiResourceNamePrefix = "wby-";
        const [pulumiResourceNamePrefixExt] = projectConfig.extensionsByType(
            pulumiResourceNamePrefixExtension
        );

        if (pulumiResourceNamePrefixExt) {
            pulumiResourceNamePrefix = pulumiResourceNamePrefixExt.params.prefix;
        }

        return pulumiResourceNamePrefix;
    }
}

export const getPulumiResourceNamePrefix = createImplementation({
    abstraction: GetPulumiResourceNamePrefix,
    implementation: DefaultGetPulumiResourceNamePrefix,
    dependencies: [GetProjectConfigService]
});
