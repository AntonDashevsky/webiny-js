import { createImplementation } from "@webiny/di-container";
import { BuildAppCommand, GetProjectService, GetAppService, BuildAppService } from "~/abstractions";

export class DefaultBuildAppCommand implements BuildAppCommand.Interface {
    constructor(
        private getProjectService: GetProjectService.Interface,
        private getAppService: GetAppService.Interface,
        private buildAppService: BuildAppService.Interface
    ) {}

    async execute(params: BuildAppCommand.Params): Promise<void> {
        const project = this.getProjectService.execute(params.app);
        const app = this.getAppService.execute(project, params.app);

        return this.buildAppService.execute(app, params);
    }
}

export const buildAppCommand = createImplementation({
    abstraction: BuildAppCommand,
    implementation: DefaultBuildAppCommand,
    dependencies: [GetProjectService, GetAppService, BuildAppService]
});
