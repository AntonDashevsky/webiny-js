import { createImplementation } from "@webiny/di-container";
import { DeployApp, GetProjectService, GetAppService, DeployAppService } from "~/abstractions";

export class DefaultDeployApp implements DeployApp.Interface {
    constructor(
        private getProjectService: GetProjectService.Interface,
        private getAppService: GetAppService.Interface,
        private deployAppService: DeployAppService.Interface
    ) {}

    async execute(params: DeployApp.Params): Promise<void> {
        const project = this.getProjectService.execute();
        const app = this.getAppService.execute(project, params.app);

        return this.deployAppService.execute(app, params);
    }
}

export const deployApp = createImplementation({
    abstraction: DeployApp,
    implementation: DefaultDeployApp,
    dependencies: [GetProjectService, GetAppService, DeployAppService]
});
