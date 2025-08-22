import { createImplementation } from "@webiny/di-container";
import {
    BuildApp,
    GetApp,
    GetProjectConfigService,
    ListPackagesInAppWorkspaceService,
    LoggerService,
    ValidateProjectConfigService
} from "~/abstractions/index.js";
import { PackagesBuilder } from "./builders/PackagesBuilder.js";

export class DefaultBuildApp implements BuildApp.Interface {
    constructor(
        private getApp: GetApp.Interface,
        private logger: LoggerService.Interface,
        private listPackagesService: ListPackagesInAppWorkspaceService.Interface,
        private getProjectConfigService: GetProjectConfigService.Interface,
        private validateProjectConfigService: ValidateProjectConfigService.Interface
    ) {}

    async execute(params: BuildApp.Params) {
        if (!params.env) {
            throw new Error(`Please specify environment, for example "dev".`);
        }

        const projectConfig = await this.getProjectConfigService.execute({
            tags: { appName: params.app, runtimeContext: "app-build" }
        });

        await this.validateProjectConfigService.execute(projectConfig);

        for (const extensionType in projectConfig.config) {
            const oneOrMoreExtensions = projectConfig.config[extensionType];
            const extensionsArray = Array.isArray(oneOrMoreExtensions)
                ? [...oneOrMoreExtensions]
                : [oneOrMoreExtensions];

            for (const extensionInstance of extensionsArray) {
                await extensionInstance.build();
            }
        }

        const packages = await this.listPackagesService.execute(params.app);
        const packagesBuilder = new PackagesBuilder({
            packages,
            params,
            logger: this.logger
        });

        const buildProcesses = packagesBuilder.build();

        // Promisify the build processes.
        const buildPromises = buildProcesses.map(buildProcess => {
            return new Promise<void>((resolve, reject) => {
                buildProcess.process.on("exit", code => {
                    if (code === 0) {
                        resolve();
                    } else {
                        reject(
                            new Error(
                                `Build failed for package ${buildProcess.packageName} with exit code ${code}`
                            )
                        );
                    }
                });
            });
        });

        // If custom output function is provided, use it. While doing so, we must wait
        // for it to resolve before finishing the build process.
        let output = Promise.resolve();
        if (params.output) {
            output = params.output(buildProcesses);
        } else {
            this.logger.debug(`No output function provided, skipping output.`);
        }

        await Promise.all(buildPromises);
        await output;
    }
}

export const buildApp = createImplementation({
    abstraction: BuildApp,
    implementation: DefaultBuildApp,
    dependencies: [
        GetApp,
        LoggerService,
        ListPackagesInAppWorkspaceService,
        GetProjectConfigService,
        ValidateProjectConfigService
    ]
});
