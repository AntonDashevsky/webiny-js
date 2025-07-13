import { createImplementation } from "@webiny/di-container";
import { ValidateProjectConfig, ValidateProjectConfigService } from "~/abstractions/index.js";

export class DefaultValidateProjectConfig implements ValidateProjectConfig.Interface {
    constructor(private validateProjectConfigService: ValidateProjectConfigService.Interface) {}

    async execute(projectConfig: ValidateProjectConfig.Params) {
        return this.validateProjectConfigService.execute(projectConfig);
    }
}

export const validateProjectConfig = createImplementation({
    abstraction: ValidateProjectConfig,
    implementation: DefaultValidateProjectConfig,
    dependencies: [ValidateProjectConfigService]
});
