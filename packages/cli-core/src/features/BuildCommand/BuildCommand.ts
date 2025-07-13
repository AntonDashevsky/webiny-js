import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService, StdioService, UiService } from "~/abstractions/index.js";
import { IBaseAppParams } from "~/abstractions/features/types.js";
import { BuildOutput } from "~/features/BuildCommand/buildOutputs/BuildOutput";

export interface IBuildCommandParams extends IBaseAppParams {}

export class BuildCommand implements Command.Interface<IBuildCommandParams> {
    constructor(
        private getProjectSdkService: GetProjectSdkService.Interface,
        private stdioService: StdioService.Interface,
        private ui: UiService.Interface
    ) {}

    async execute(): Promise<Command.CommandDefinition<IBuildCommandParams>> {
        const projectSdk = await this.getProjectSdkService.execute();

        return {
            name: "build",
            description: "Builds specified app",
            examples: ["$0 build api --env dev", "$0 build admin --env prod"],
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
            ],
            handler: async (params: IBuildCommandParams) => {
                const stdio = this.stdioService;
                const ui = this.ui;

                try {
                    const buildProcesses = await projectSdk.buildApp(params);

                    const buildOutput = new BuildOutput({
                        stdio,
                        ui,
                        buildProcesses
                    });

                    await buildOutput.output();
                } catch (error) {
                    ui.error("Build failed, please check the details above.");
                    throw error;
                }
            }
        };
    }
}

export const buildCommand = createImplementation({
    abstraction: Command,
    implementation: BuildCommand,
    dependencies: [GetProjectSdkService, StdioService, UiService]
});
