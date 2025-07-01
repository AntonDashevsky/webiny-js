import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService } from "~/abstractions/index.js";

export class InfoCommand implements Command.Interface {
    constructor(private getProjectSdkService: GetProjectSdkService.Interface) {}

    execute() {
        return {
            name: "info",
            description: "Lists relevant URLs for your Webiny project.",
            options: [
                {
                    name: "env",
                    description: `Environment (required if Pulumi state files are not stored locally)`,
                    type: "string",
                    required: false
                },
                {
                    name: "debug",
                    description: "Debug",
                    type: "string"
                }
            ],

            handler: async (args: any) => {
                const data = await this.getProjectSdkService.execute().getProjectInfo();

                console.log("info");
                // if (args.json) {
                //     console.log(JSON.stringify(data, null, 2));
                //     return;
                // }
                //
                // data.forEach(({ sectionName, data }, index) => {
                //     if (index > 0) {
                //         console.log();
                //     }
                //
                //     console.log(chalk.bold(sectionName));
                //
                //     Object.keys(data).forEach(key => {
                //         console.log(key.padEnd(36), data[key] || NO_VALUE);
                //     });
                // });
            }
        };
    }
}

export const infoCommand = createImplementation({
    abstraction: Command,
    implementation: InfoCommand,
    dependencies: [GetProjectSdkService]
});
