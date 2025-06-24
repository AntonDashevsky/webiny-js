import { createImplementation } from "@webiny/di-container";
import { ProjectInfoCommand, ProjectInfoService } from "~/abstractions";

export class DefaultProjectInfoCommand implements ProjectInfoCommand.Interface {
    constructor(private projectInfoService: ProjectInfoService.Interface) {}

    async execute() {
        return this.projectInfoService.execute();
    }
}

export const projectInfoCommand = createImplementation({
    abstraction: ProjectInfoCommand,
    implementation: DefaultProjectInfoCommand,
    dependencies: [ProjectInfoService]
});
