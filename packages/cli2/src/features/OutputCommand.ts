import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService, StdioService } from "~/abstractions/index.js";
import { IBaseAppParams } from "~/abstractions/features/types.js";

export interface IOutputCommandParams extends IBaseAppParams {
    json?: boolean;
}

export class OutputCommand implements Command.Interface<IOutputCommandParams> {
    constructor(
        private getProjectSdkService: GetProjectSdkService.Interface,
        private stdioService: StdioService.Interface
    ) {}

    execute() {
        return {
            name: "output",
            description: "Prints Pulumi stack output for given project application and environment",
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
                    name: "json",
                    description: "Emit output as JSON",
                    type: "boolean"
                }
            ],
            handler: async (params: IOutputCommandParams) => {
                const projectSdk = this.getProjectSdkService.execute();
                const stdio = this.stdioService;

                const { pulumiProcess } = await projectSdk.getAppOutput(params);

                pulumiProcess.stdout!.pipe(stdio.getStdout());
            }
        };
    }
}

export const outputCommand = createImplementation({
    abstraction: Command,
    implementation: OutputCommand,
    dependencies: [GetProjectSdkService, StdioService]
});
