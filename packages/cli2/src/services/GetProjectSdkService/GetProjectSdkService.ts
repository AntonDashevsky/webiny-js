import { createImplementation } from "@webiny/di-container";
import { ProjectSdk } from "@webiny/project";
import { GetProjectSdkService } from "~/abstractions/index.js";

export class DefaultGetProjectSdkService implements GetProjectSdkService.Interface {
    execute() {
        const sdk = ProjectSdk.init();
        if (!sdk) {
            throw new Error("Project SDK is not initialized.");
        }
        return sdk;
    }
}

export const getProjectSdkService = createImplementation({
    abstraction: GetProjectSdkService,
    implementation: DefaultGetProjectSdkService,
    dependencies: []
});
