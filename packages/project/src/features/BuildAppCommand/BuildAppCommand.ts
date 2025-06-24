import { createImplementation } from "@webiny/di-container";
import { BuildAppCommand, GetAppService, BuildAppService } from "~/abstractions";

export class DefaultBuildProjectCommand implements BuildAppCommand.Interface {
    constructor(
        private getAppService: GetAppService.Interface,
        private buildAppService: BuildAppService.Interface
    ) {}

    async execute(params: BuildAppCommand.Params): Promise<void> {
        const app = this.getAppService.execute(params.app);

        return this.buildAppService.execute(app, params);
    }
}

export const buildAppCommand = createImplementation({
    abstraction: BuildAppCommand,
    implementation: DefaultBuildProjectCommand,
    dependencies: [GetAppService, BuildAppService]
});
