import { createImplementation } from "@webiny/di-container";
import { GetAppOutput, GetProjectService, GetAppService, PulumiGetStackOutputService } from "~/abstractions";

export class DefaultGetAppOutput implements GetAppOutput.Interface {
    constructor(
        private getProjectService: GetProjectService.Interface,
        private getAppService: GetAppService.Interface,
        private pulumiGetStackOutputService: PulumiGetStackOutputService.Interface
    ) {}

    async execute(params: GetAppOutput.Params) {
        const project = this.getProjectService.execute(params.app);
        const app = this.getAppService.execute(project, params.app);

        return this.pulumiGetStackOutputService.execute(app, params);
    }
}

export const getAppOutput = createImplementation({
    abstraction: GetAppOutput,
    implementation: DefaultGetAppOutput,
    dependencies: [GetProjectService, GetAppService, PulumiGetStackOutputService]
});
