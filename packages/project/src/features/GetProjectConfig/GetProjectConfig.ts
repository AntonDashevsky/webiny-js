import { createImplementation } from "@webiny/di-container";
import { GetProjectConfig, GetProjectConfigService } from "~/abstractions/index.js";

export class DefaultGetProjectConfig implements GetProjectConfig.Interface {
    constructor(private getProjectConfigService: GetProjectConfigService.Interface) {}

    async execute<TConfig extends Record<string, any> = Record<string, any>>() {
        return this.getProjectConfigService.execute<TConfig>();
    }
}

export const getProjectConfig = createImplementation({
    abstraction: GetProjectConfig,
    implementation: DefaultGetProjectConfig,
    dependencies: [GetProjectConfigService]
});
