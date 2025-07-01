import { createImplementation } from "@webiny/di-container";
import { GetProject, GetProjectService } from "~/abstractions/index.js";

export class DefaultGetProject implements GetProject.Interface {
    constructor(private getProjectService: GetProjectService.Interface) {}

    async execute(cwd?: string) {
        return this.getProjectService.execute(cwd);
    }
}

export const getProject = createImplementation({
    abstraction: GetProject,
    implementation: DefaultGetProject,
    dependencies: [GetProjectService]
});
