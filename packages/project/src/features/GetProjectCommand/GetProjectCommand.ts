import { createImplementation } from "@webiny/di-container";
import { GetProjectCommand, GetProjectService } from "~/abstractions";

export class DefaultGetProjectCommand implements GetProjectCommand.Interface {
    constructor(private getProjectService: GetProjectService.Interface) {}

    async execute(cwd?: string) {
        return this.getProjectService.execute(cwd);
    }
}

export const getProjectCommand = createImplementation({
    abstraction: GetProjectCommand,
    implementation: DefaultGetProjectCommand,
    dependencies: [GetProjectService]
});
