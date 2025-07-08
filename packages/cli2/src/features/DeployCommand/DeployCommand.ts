import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService, StdioService, UiService } from "~/abstractions/index.js";
import { IBaseAppParams } from "~/abstractions/features/types.js";
import { BuildOutput } from "~/features/BuildCommand/buildOutputs/BuildOutput";
import { DeployOutput } from "./deployOutputs/DeployOutput.js";

export interface IDeployCommandParams extends IBaseAppParams {
    build?: boolean;
    preview?: boolean;
    deploymentLogs?: boolean;
}

export class DeployCommand implements Command.Interface<IDeployCommandParams> {
    constructor(
        private getProjectSdkService: GetProjectSdkService.Interface,
        private uiService: UiService.Interface,
        private stdioService: StdioService.Interface
    ) {}

    execute(): Command.CommandDefinition<IDeployCommandParams> {
        const projectSdk = this.getProjectSdkService.execute();

        return {
            name: "deploy",
            description: "Deploys specified app",
            examples: ["$0 deploy api --env dev", "$0 deploy admin --env prod"],
            params: [
                {
                    name: "app",
                    description: "Name of the app (core, admin, or api)",
                    type: "string",
                    required: true
                }
            ],
            options: [
                {
                    name: "env",
                    description: "Environment name (dev, prod, etc.)",
                    type: "string",
                    required: true
                },
                {
                    name: "variant",
                    description: "Variant of the app to deploy",
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
                const projectSdk = this.getProjectSdkService.execute();
                const ui = this.uiService;
                const stdio = this.stdioService;

                if (params.build !== false) {
                    try {
                        const buildProcesses = await projectSdk.buildApp(params);
                        const buildOutput = new BuildOutput({ stdio, ui, buildProcesses });
                        await buildOutput.output();
                        ui.newLine();
                    } catch (error) {
                        ui.error("Build failed, please check the details above.");
                        throw error;
                    }
                }

                // We always show deployment logs when doing previews.
                const showDeploymentLogs =
                    Boolean(projectSdk.isCi() || params.preview || params.deploymentLogs);

                const { pulumiProcess } = await projectSdk.deployApp(params);

                const deployOutput = new DeployOutput({
                    stdio,
                    ui,
                    showDeploymentLogs,
                    deployProcess: pulumiProcess,
                    deployParams:params
                });

                await deployOutput.output();
            }
        };
    }
}

export const deployCommand = createImplementation({
    abstraction: Command,
    implementation: DeployCommand,
    dependencies: [GetProjectSdkService, UiService, StdioService]
});
