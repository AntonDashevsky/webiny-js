import { createImplementation } from "@webiny/di-container";
import { BuildApp, GetApp, GetAppPackagesService, LoggerService } from "~/abstractions";
import { createAppWorkspace } from "~/utils";
import { PackagesBuilder } from "./packagesBuilders/PackagesBuilder";

export class DefaultBuildApp implements BuildApp.Interface {
    constructor(
        private getApp: GetApp.Interface,
        private getAppPackagesService: GetAppPackagesService.Interface,
        private logger: LoggerService.Interface
    ) {}

    async execute(params: BuildApp.Params) {
        if (!params.env) {
            throw new Error(`Please specify environment, for example "dev".`);
        }

        const app = await this.getApp.execute(params.app);

        await createAppWorkspace({
            app,
            env: params.env,
            variant: params.variant
        });

        const packages = await this.getAppPackagesService.execute(app);
        const packagesBuilder = new PackagesBuilder(packages, params, this.logger);
        await packagesBuilder.build();
    }
}

export const buildApp = createImplementation({
    abstraction: BuildApp,
    implementation: DefaultBuildApp,
    dependencies: [ GetApp, GetAppPackagesService, LoggerService]
});
