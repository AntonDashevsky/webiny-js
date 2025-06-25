import { createImplementation } from "@webiny/di-container";
import { GetProjectInfoCommand, ProjectInfoService } from "~/abstractions";

export class DefaultGetProjectInfoCommand implements GetProjectInfoCommand.Interface {
    constructor(private projectInfoService: ProjectInfoService.Interface) {}

    async execute() {
        return this.projectInfoService.execute();
    }
}

export const getProjectInfoCommand = createImplementation({
    abstraction: GetProjectInfoCommand,
    implementation: DefaultGetProjectInfoCommand,
    dependencies: [ProjectInfoService]
});
