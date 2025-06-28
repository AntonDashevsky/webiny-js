import { createImplementation } from "@webiny/di-container";
import { DeployAppCommand, GetProjectService, GetAppService, DeployAppService } from "~/abstractions";

export class DefaultDeployAppCommand implements DeployAppCommand.Interface {
    constructor(
        private getProjectService: GetProjectService.Interface,
        private getAppService: GetAppService.Interface,
        private deployAppService: DeployAppService.Interface
    ) {}

    async execute(params: DeployAppCommand.Params): Promise<void> {
        const project = this.getProjectService.execute();
        const app = this.getAppService.execute(project, params.app);

        return this.deployAppService.execute(app, params);
    }
}

export const deployAppCommand = createImplementation({
    abstraction: DeployAppCommand,
    implementation: DefaultDeployAppCommand,
    dependencies: [GetProjectService, GetAppService, DeployAppService]
});
