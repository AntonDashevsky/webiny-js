import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService, StdioService, UiService } from "~/abstractions/index.js";
import { HandledError } from "~/utils/HandledError.js";
import { DeployOutput } from "./deployOutputs/DeployOutput.js";
import { AppName } from "~/abstractions/features/types.js";
import { BuildRunner } from "~/features/BuildCommand/buildRunners/BuildRunner.js";

export interface IDeployNoAppParams {
    variant?: string;
    region?: string;
    env: string;
    deploymentLogs?: boolean;
}

export interface IDeployWithAppParams extends IDeployNoAppParams {
    app: AppName;
    build?: boolean;
    preview?: boolean;
}

export type IDeployCommandParams = IDeployNoAppParams | IDeployWithAppParams;

export class DeployCommand implements Command.Interface<IDeployCommandParams> {
    constructor(
        private getProjectSdkService: GetProjectSdkService.Interface,
        private uiService: UiService.Interface,
        private stdioService: StdioService.Interface
    ) {}

    async execute(): Promise<Command.CommandDefinition<IDeployCommandParams>> {
        const projectSdk = await this.getProjectSdkService.execute();

        return {
            name: "deploy",
            description: "Deploys specified app or all apps in the project",
            examples: [
                "$0 deploy api --env dev",
                "$0 deploy admin --env prod",
                "$0 deploy --env prod",
                "$0 deploy"
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
                    type: "string",
                    default: "dev",
                    validation: params => {
                        if ("app" in params && !params.env) {
                            throw new Error("Environment name is required when deploying an app.");
                        }
                        return true;
                    }
                },
                {
                    name: "variant",
                    description: "Variant of the app to deploy",
                    type: "string",
                    validation: params => {
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
                    validation: params => {
                        const isValid = projectSdk.isValidRegionName(params.region);
                        if (isValid.isErr()) {
                            throw isValid.error;
                        }
                        return true;
                    }
                },
                {
                    name: "build",
                    description: "Build packages before deploying",
                    type: "boolean",
                    default: true
                },
                {
                    name: "preview",
                    description: "Preview the deploy instead of actually performing it",
                    type: "boolean",
                    default: false
                },
                {
                    name: "deployment-logs",
                    description: "Print deployment logs (automatically enabled in CI environments)",
                    type: "boolean",
                    default: false
                }
            ],
            handler: async (params: IDeployCommandParams) => {
                if ("app" in params) {
                    await this.deployApp(params);
                } else {
                    // Deploy all apps in the project.
                    await this.deployApp({ ...params, app: "core" });
                    await this.deployApp({ ...params, app: "api" });
                    await this.deployApp({ ...params, app: "admin" });
                    await this.deployApp({ ...params, app: "website" });
                }
            }
        };
    }

    private async deployApp(params: IDeployWithAppParams) {
        const projectSdk = await this.getProjectSdkService.execute();

        const ui = this.uiService;
        const stdio = this.stdioService;

        if (params.build !== false) {
            try {
                const packagesBuilder = await projectSdk.buildApp(params);

                const buildRunner = new BuildRunner({
                    stdio,
                    ui,
                    packagesBuilder
                });

                await buildRunner.run();
                ui.newLine();
            } catch (error) {
                throw HandledError.from(error);
            }
        }

        // We always show deployment logs when doing previews.
        const showDeploymentLogs = Boolean(
            projectSdk.isCi() || params.preview || params.deploymentLogs
        );

        try {
            return await projectSdk.deployApp({
                ...params,
                output: pulumiProcess => {
                    const deployOutput = new DeployOutput({
                        stdio,
                        ui,
                        showDeploymentLogs,
                        deployProcess: pulumiProcess,
                        deployParams: params
                    });

                    return deployOutput.output();
                }
            });
        } catch (error) {
            throw HandledError.from(error);
        }
    }
}

export const deployCommand = createImplementation({
    abstraction: Command,
    implementation: DeployCommand,
    dependencies: [GetProjectSdkService, UiService, StdioService]
});
