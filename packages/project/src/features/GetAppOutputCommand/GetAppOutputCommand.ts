import { createImplementation } from "@webiny/di-container";
import { GetAppOutputCommand, GetProjectService, GetAppService, PulumiGetStackOutputService } from "~/abstractions";

export class DefaultGetAppOutputCommand implements GetAppOutputCommand.Interface {
    constructor(
        private getProjectService: GetProjectService.Interface,
        private getAppService: GetAppService.Interface,
        private pulumiGetStackOutputService: PulumiGetStackOutputService.Interface
    ) {}

    async execute(params: GetAppOutputCommand.Params) {
        const project = this.getProjectService.execute(params.app);
        const app = this.getAppService.execute(project, params.app);

        return this.pulumiGetStackOutputService.execute(app, params);
    }
}

export const getAppOutputCommand = createImplementation({
    abstraction: GetAppOutputCommand,
    implementation: DefaultGetAppOutputCommand,
    dependencies: [GetProjectService, GetAppService, PulumiGetStackOutputService]
});
