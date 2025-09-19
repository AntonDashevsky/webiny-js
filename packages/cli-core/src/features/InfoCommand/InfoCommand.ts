import path from "path";
import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService, UiService } from "~/abstractions/index.js";
import { IBaseAppParams } from "~/abstractions/features/types.ts";
import glob from "fast-glob";
import { splitStackName } from "@webiny/project/utils/index.js";
import { PrintInfoForEnv } from "./PrintInfoForEnv.js";

export type IInfoCommandParams = Omit<IBaseAppParams, "app">;

export class InfoCommand implements Command.Interface<IInfoCommandParams> {
    constructor(
        private getProjectSdkService: GetProjectSdkService.Interface,
        private uiService: UiService.Interface
    ) {}

    async execute(): Promise<Command.CommandDefinition<IInfoCommandParams>> {
        const projectSdk = await this.getProjectSdkService.execute();

        return {
            name: "info",
            description: "Lists relevant URLs for your Webiny project",
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
                }
            ],

            handler: async params => {
                const project = projectSdk.getProject();
                const ui = this.uiService;

                const printInfoForEnv = new PrintInfoForEnv({
                    getProjectSdkService: this.getProjectSdkService,
                    uiService: this.uiService
                });

                if (!params.env) {
                    // We just get stack files for deployed Core application. That's enough
                    // to determine into which environments the user has deployed their project.
                    const pulumiAdminStackFilesPaths = glob.sync(
                        ".pulumi/**/apps/core/.pulumi/stacks/**/*.json",
                        {
                            cwd: project.paths.rootFolder.toString(),
                            onlyFiles: true,
                            dot: true
                        }
                    );

                    const existingEnvs = pulumiAdminStackFilesPaths.map(current => {
                        return splitStackName(path.basename(current, ".json"));
                    });

                    if (existingEnvs.length === 0) {
                        ui.info(
                            "It seems that no environments have been deployed yet. Please deploy the project first."
                        );
                        return;
                    }

                    if (existingEnvs.length === 1) {
                        ui.info("There is one deployed environment.");
                        ui.info("Here is the information for the environment.");
                    } else {
                        ui.info(
                            "There's a total of %d deployed environments.",
                            existingEnvs.length
                        );
                        ui.info("Here is the information for each environment.");
                        console.log();
                    }

                    for (const { env, variant } of existingEnvs) {
                        await printInfoForEnv.execute({ env, variant });
                        ui.newLine();
                    }
                } else {
                    await printInfoForEnv.execute({ env: params.env, variant: params.variant });
                    ui.newLine();
                }

                ui.info(
                    "If some of the information is missing for a particular environment, make sure that the project has been fully deployed into that environment. You can do that by running the %s command.",
                    "yarn webiny deploy --env {ENVIRONMENT_NAME}"
                );
            }
        };
    }
}

export const infoCommand = createImplementation({
    abstraction: Command,
    implementation: InfoCommand,
    dependencies: [GetProjectSdkService, UiService]
});
