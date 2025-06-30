import { createImplementation } from "@webiny/di-container";
import { GetProjectInfo, ProjectInfoService } from "~/abstractions";

export class DefaultGetProjectInfo implements GetProjectInfo.Interface {
    constructor(private projectInfoService: ProjectInfoService.Interface) {}

    async execute() {
        return this.projectInfoService.execute();
    }
}

export const getProjectInfo = createImplementation({
    abstraction: GetProjectInfo,
    implementation: DefaultGetProjectInfo,
    dependencies: [ProjectInfoService]
});
