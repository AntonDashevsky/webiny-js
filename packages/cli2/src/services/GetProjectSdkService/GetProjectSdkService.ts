import { createImplementation } from "@webiny/di-container";
import { GetProjectSdkService } from "~/abstractions/services/GetProjectSdkService";
import { ProjectSdk } from "@webiny/project";

export class DefaultGetProjectSdkService implements GetProjectSdkService.Interface {
    execute(cwd?: string) {
        return ProjectSdk.init(cwd);
    }
}

export const getProjectSdkService = createImplementation({
    abstraction: GetProjectSdkService,
    implementation: DefaultGetProjectSdkService,
    dependencies: []
});
