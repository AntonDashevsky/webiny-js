import { createImplementation } from "@webiny/di-container";
import {
    BuildApp,
    GetApp,
    GetProjectConfigService,
    ListPackagesInAppWorkspaceService,
    LoggerService
} from "~/abstractions/index.js";
import { createAppWorkspace } from "~/utils/index.js";
import { PackagesBuilder } from "./builders/PackagesBuilder.js";
import path from "path";
import fs from "fs";

export class DefaultBuildApp implements BuildApp.Interface {
    constructor(
        private getApp: GetApp.Interface,
        private logger: LoggerService.Interface,
        private listPackagesService: ListPackagesInAppWorkspaceService.Interface,
        private getProjectConfigService: GetProjectConfigService.Interface
    ) {}

    async execute(params: BuildApp.Params) {
        if (!params.env) {
            throw new Error(`Please specify environment, for example "dev".`);
        }

        const app = await this.getApp.execute(params.app);

        // Copy app template. TODO: this is prototype code 💩.
        await createAppWorkspace({
            app,
            env: params.env,
            variant: params.variant
        });

        const projectConfig = await this.getProjectConfigService.execute();

        const templateFolderPath = path.join(
            import.meta.dirname,
            '../..',
            "__prototyping",
            "template",
            "ddb",
            "apps",
            params.app
        );

        fs.cpSync(templateFolderPath, app.paths.workspaceFolder.absolute, {
            recursive: true,
            force: true
        });

        const packages = await this.listPackagesService.execute(params.app);
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
    dependencies: [
        GetApp,
        LoggerService,
        ListPackagesInAppWorkspaceService,
        GetProjectConfigService
    ]
});
