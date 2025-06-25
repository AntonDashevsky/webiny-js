import { createImplementation } from "@webiny/di-container";
import { BuildAppService, GetAppPackagesService, LoggerService } from "~/abstractions";
import { AppModel } from "~/models";
import { PackagesBuilder } from "./packagesBuilders/PackagesBuilder";

export class DefaultBuildAppService implements BuildAppService.Interface {
    constructor(
        private getAppPackagesService: GetAppPackagesService.Interface,
        private logger: LoggerService.Interface
    ) {}

    async execute(app: AppModel, buildParams: BuildAppService.Params): Promise<void> {
        const packages = await this.getAppPackagesService.execute(app);

        console.log('packages', packages)
        const packagesBuilder = new PackagesBuilder(packages, buildParams, this.logger);

        return packagesBuilder.build();
    }
}

export const buildAppService = createImplementation({
    abstraction: BuildAppService,
    implementation: DefaultBuildAppService,
    dependencies: [GetAppPackagesService, LoggerService]
});
