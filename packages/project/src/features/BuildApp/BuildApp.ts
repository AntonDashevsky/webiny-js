import { createImplementation } from "@webiny/di-container";
import {
    BuildApp,
    GetApp,
    GetProject,
    ListPackagesService,
    LoggerService
} from "~/abstractions/index.js";
import { createAppWorkspace } from "~/utils/index.js";
import { PackagesBuilder } from "./builders/PackagesBuilder.js";

export class DefaultBuildApp implements BuildApp.Interface {
    constructor(
        private getProject: GetProject.Interface,
        private getApp: GetApp.Interface,
        private logger: LoggerService.Interface,
        private listPackagesService: ListPackagesService.Interface
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

        const packages = await this.listPackagesService.execute(params);
        const packagesBuilder = new PackagesBuilder({
            packages,
            params,
            logger: this.logger
        });

        return packagesBuilder.build();
    }
}

export const buildApp = createImplementation({
    abstraction: BuildApp,
    implementation: DefaultBuildApp,
    dependencies: [GetProject, GetApp, LoggerService, ListPackagesService]
});
