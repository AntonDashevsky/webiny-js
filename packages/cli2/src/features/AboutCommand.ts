import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService } from "~/abstractions";

export class AboutCommand implements Command.Interface {
    constructor(private getProjectSdkService: GetProjectSdkService.Interface) {}

    execute() {
        return {
            name: "about",
            description: "Prints out information helpful for debugging purposes.",
            options: [
                {
                    name: "json",
                    description: "Emit output as JSON.",
                    type: "boolean",
                    default: false
                }
            ],
            handler: async (args:any) => {
                const data = await this.getProjectSdkService.execute().getProjectInfo();

                console.log('yeah')
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

export const aboutCommand = createImplementation({
    abstraction: Command,
    implementation: AboutCommand,
    dependencies: [GetProjectSdkService]
});
