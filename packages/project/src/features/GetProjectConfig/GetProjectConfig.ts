import { createImplementation } from "@webiny/di-container";
import { GetProjectConfig, GetProjectConfigService } from "~/abstractions/index.js";

export class DefaultGetProjectConfig implements GetProjectConfig.Interface {
    constructor(private getProjectConfigService: GetProjectConfigService.Interface) {}

    async execute() {
        return this.getProjectConfigService.execute();
    }
}

export const getProjectConfig = createImplementation({
    abstraction: GetProjectConfig,
    implementation: DefaultGetProjectConfig,
    dependencies: [GetProjectConfigService]
});
