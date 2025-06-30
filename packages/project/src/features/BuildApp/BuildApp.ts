import { createImplementation } from "@webiny/di-container";
import { BuildApp, GetProjectService, GetAppService, BuildAppService } from "~/abstractions";

export class DefaultBuildApp implements BuildApp.Interface {
    constructor(
        private getProjectService: GetProjectService.Interface,
        private getAppService: GetAppService.Interface,
        private buildAppService: BuildAppService.Interface
    ) {}

    async execute(params: BuildApp.Params): Promise<void> {
        const project = this.getProjectService.execute(params.app);
        const app = this.getAppService.execute(project, params.app);

        return this.buildAppService.execute(app, params);
    }
}

export const buildApp = createImplementation({
    abstraction: BuildApp,
    implementation: DefaultBuildApp,
    dependencies: [GetProjectService, GetAppService, BuildAppService]
});
