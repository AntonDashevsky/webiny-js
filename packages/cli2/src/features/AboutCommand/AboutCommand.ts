import { createImplementation } from "@webiny/di-container";
import { Command, GetProjectSdkService } from "~/abstractions";

export class DefaultAboutCommand implements Command.Interface<void, any> {
    constructor(private getProjectSdkService: GetProjectSdkService.Interface) {}

    getDefinition() {
        return {
            name: "about",
            description: "Prints out information helpful for debugging purposes"
        };
    }

    async execute(): Promise<any> {
        const projectSdk = this.getProjectSdkService.execute();
        return projectSdk.getProjectInfo();
    }
}

export const aboutCommand = createImplementation({
    abstraction: Command,
    implementation: DefaultAboutCommand,
    dependencies: [GetProjectSdkService]
});
