import { createImplementation } from "@webiny/di-container";
import { ProjectSdk } from "@webiny/project";
import { CliParamsService, GetProjectSdkService } from "~/abstractions/index.js";

export class DefaultGetProjectSdkService implements GetProjectSdkService.Interface {
    constructor(private readonly cliParamsService: CliParamsService.Interface) {}

    async execute() {
        const cliParams = this.cliParamsService.get();
        const sdk = await ProjectSdk.init(cliParams);
        if (!sdk) {
            throw new Error("Project SDK is not initialized.");
        }
        return sdk;
    }
}

export const getProjectSdkService = createImplementation({
    abstraction: GetProjectSdkService,
    implementation: DefaultGetProjectSdkService,
    dependencies: [CliParamsService]
});
