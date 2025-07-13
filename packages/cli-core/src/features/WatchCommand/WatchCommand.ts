import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService, StdioService, UiService } from "~/abstractions/index.js";
import { IBaseAppParams } from "~/abstractions/features/types.js";
import chalk from "chalk";
import { getRandomColorForString } from "./getRandomColorForString";
import { createPrefixer } from "./createPrefixer";

export interface IWatchCommandParams extends IBaseAppParams {}

export class WatchCommand implements Command.Interface<IWatchCommandParams> {
    constructor(
        private getProjectSdkService: GetProjectSdkService.Interface,
        private stdioService: StdioService.Interface,
        private uiService: UiService.Interface
    ) {}

    async execute(): Promise<Command.CommandDefinition<IWatchCommandParams>> {
        const projectSdk = await this.getProjectSdkService.execute();
        const stdio = this.stdioService;
        const ui = this.uiService;

        return {
            name: "watch",
            description: "Watches code changes for a specific app or package.",
            examples: [
                "watch api --env dev",
                "watch admin --env prod",
                "watch -p my-package1,my-package2",
                "watch api --env dev -p my-package1,my-package2"
            ],
            params: [
                {
                    name: "app",
                    description: "Name of the app (core, admin, or api)",
                    type: "string"
                }
            ],
            options: [
                {
                    name: "env",
                    description: "Environment name (dev, prod, etc.)",
                    type: "string"
                },
                {
                    name: "variant",
                    description: "Variant of the app to watch",
                    type: "string",
                    validation: (params) => {
                        const isValid = projectSdk.isValidVariantName(params.variant);
                        if (isValid.isErr()) {
                            throw isValid.error;
                        }
                        return true;
                    }
                },
                {
                    name: "region",
                    description: "Region to target",
                    type: "string",
                    validation: (params) => {
                        const isValid = projectSdk.isValidRegionName(params.region)
                        if (isValid.isErr()) {
                            throw isValid.error;
                        }
                        return true;
                    }
                },
                {
                    name: "package",
                    alias: "p",
                    description: `One or more packages that will be watched for code changes`,
                    type: "string"
                }
            ],
            handler: async (params: IWatchCommandParams) => {
                const watchProcesses = await projectSdk.watch(params);

                if (watchProcesses.length === 1) {
                    const [watchProcess] = watchProcesses;
                    watchProcess.process.stdout!.pipe(stdio.getStdout());
                    watchProcess.process.stderr!.pipe(stdio.getStderr());
                } else {
                    if (watchProcesses.length > 1) {
                        ui.info(
                            `Watching ${watchProcesses.length} packages. Output will be displayed below:\n`
                        );

                        watchProcesses.forEach(watchProcess => {
                            const { packageName, process: childProcess } = watchProcess;
                            const pkgPrefix = chalk.hex(getRandomColorForString(packageName))(
                                packageName
                            );

                            if (childProcess.stdout) {
                                const prefixedStdout = createPrefixer(pkgPrefix);
                                childProcess.stdout.pipe(prefixedStdout).pipe(stdio.getStdout());
                            }

                            if (childProcess.stderr) {
                                const prefixedStderr = createPrefixer(pkgPrefix);
                                childProcess.stderr.pipe(prefixedStderr).pipe(stdio.getStderr());
                            }
                        });
                    }
                }
            }
        };
    }
}

export const watchCommand = createImplementation({
    abstraction: Command,
    implementation: WatchCommand,
    dependencies: [GetProjectSdkService, StdioService, UiService]
});