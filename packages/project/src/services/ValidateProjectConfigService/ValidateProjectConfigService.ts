import { createImplementation } from "@webiny/di-container";
import { GetProjectConfigService, ValidateProjectConfigService } from "~/abstractions/index.js";

export class DefaultValidateProjectConfigService implements ValidateProjectConfigService.Interface {
    constructor(private readonly getProjectConfigService: GetProjectConfigService.Interface) {}

    async execute(projectConfig: ValidateProjectConfigService.Params): Promise<void> {
        const extensionTypes = Object.keys(projectConfig.config);
        for (const extensionType of extensionTypes) {
            const extensionsCollection = projectConfig.config[extensionType] || [];
            for (const extension of extensionsCollection) {
                if (extension.validate) {
                    try {
                        await extension.validate();
                    } catch (error) {
                        throw new Error(
                            `Validation failed for extension of type "${extensionType}": ${error.message}`
                        );
                    }
                }
            }
        }
    }
}

export const validateProjectConfigService = createImplementation({
    abstraction: ValidateProjectConfigService,
    implementation: DefaultValidateProjectConfigService,
    dependencies: [GetProjectConfigService]
});
