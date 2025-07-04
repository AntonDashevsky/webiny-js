import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService, StdioService } from "~/abstractions/index.js";
import { IBaseAppParams } from "~/abstractions/features/types.js";

export interface IBuildCommandParams extends IBaseAppParams {}

export class BuildCommand implements Command.Interface<IBuildCommandParams> {
    constructor(
        private getProjectSdkService: GetProjectSdkService.Interface,
        private stdioService: StdioService.Interface
    ) {}

    execute(): Command.Result<IBuildCommandParams> {
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
                    description: "Variant of the app to build",
                    type: "string"
                },
                {
                    name: "region",
                    description: "Region to target",
                    type: "string"
                }
            ],
            handler: async (params: IBuildCommandParams) => {
                const projectSdk = this.getProjectSdkService.execute();

                await projectSdk.buildApp(params);
            }
        };
    }
}

export const buildCommand = createImplementation({
    abstraction: Command,
    implementation: BuildCommand,
    dependencies: [GetProjectSdkService, StdioService]
});
