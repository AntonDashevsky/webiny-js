import { createImplementation } from "@webiny/di-container";
import {
    BuildAppService,
    GetAppPackagesService,
    LoggerService,
} from "~/abstractions";
import { AppModel } from "~/models";
import { PackagesBuilder } from "./packagesBuilders/PackagesBuilder";

import { createAppWorkspace } from "~/utils";

export class DefaultBuildAppService implements BuildAppService.Interface {
    constructor(
        private getAppPackagesService: GetAppPackagesService.Interface,
        private logger: LoggerService.Interface,
    ) {}

    async execute(app: AppModel, buildParams: BuildAppService.Params): Promise<void> {
        if (!buildParams.env) {
            throw new Error(`Please specify environment, for example "dev".`);
        }

        await createAppWorkspace({
            app,
            env: buildParams.env,
            variant: buildParams.variant
        });

        const packages = await this.getAppPackagesService.execute(app);
        const packagesBuilder = new PackagesBuilder(packages, buildParams, this.logger);
        await packagesBuilder.build();
    }
}

export const buildAppService = createImplementation({
    abstraction: BuildAppService,
    implementation: DefaultBuildAppService,
    dependencies: [
        GetAppPackagesService,
        LoggerService,
    ]
});
