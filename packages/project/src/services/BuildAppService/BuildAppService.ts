import { createImplementation } from "@webiny/di-container";
import {
    BuildAppService,
    GetAppPackagesService,
    LoggerService,
    BeforeBuildHooksRegistry,
    AfterBuildHooksRegistry
} from "~/abstractions";
import { AppModel } from "~/models";
import { PackagesBuilder } from "./packagesBuilders/PackagesBuilder";

import { createAppWorkspace } from "~/utils";

export class DefaultBuildAppService implements BuildAppService.Interface {
    constructor(
        private getAppPackagesService: GetAppPackagesService.Interface,
        private logger: LoggerService.Interface,
        private beforeBuildHooksRegistry: BeforeBuildHooksRegistry.Interface,
        private afterBuildHooksRegistry: AfterBuildHooksRegistry.Interface
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

        const beforeBuildHooks = this.beforeBuildHooksRegistry.execute();
        for (const beforeBuildHook of beforeBuildHooks) {
            await beforeBuildHook.execute();
        }

        const packages = await this.getAppPackagesService.execute(app);
        const packagesBuilder = new PackagesBuilder(packages, buildParams, this.logger);
        await packagesBuilder.build();

        const afterBuildHooks = this.afterBuildHooksRegistry.execute();
        for (const afterBuildHook of afterBuildHooks) {
            await afterBuildHook.execute();
        }
    }
}

export const buildAppService = createImplementation({
    abstraction: BuildAppService,
    implementation: DefaultBuildAppService,
    dependencies: [
        GetAppPackagesService,
        LoggerService,
        BeforeBuildHooksRegistry,
        AfterBuildHooksRegistry
    ]
});
