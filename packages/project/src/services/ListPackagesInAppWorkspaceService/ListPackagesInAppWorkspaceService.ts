import { createImplementation } from "@webiny/di-container";
import { GetApp, ListPackagesInAppWorkspaceService } from "~/abstractions/index.js";
import glob from "fast-glob";
import { AppName } from "~/abstractions/types.js";
import path from "path";

export class DefaultListPackagesInAppWorkspaceService
    implements ListPackagesInAppWorkspaceService.Interface
{
    constructor(private getApp: GetApp.Interface) {}

    async execute(appName: AppName) {
        const app = this.getApp.execute(appName);

        const globPattern1 = app.paths.workspaceFolder.absolute + "/webiny.config.ts";
        const globPattern2 = app.paths.workspaceFolder.absolute + "/**/webiny.config.ts";
        const globResults = glob.sync([globPattern1, globPattern2], {});

        return globResults.map(webinyConfigFilePath => {
            const packageFolderPath = path.dirname(webinyConfigFilePath);
            return {
                name: path.basename(packageFolderPath),
                webinyConfig: {},
                paths: {
                    packageFolder: packageFolderPath,
                    webinyConfigFile: webinyConfigFilePath
                }
            };
        });
    }
}

export const listPackagesInAppWorkspaceService = createImplementation({
    abstraction: ListPackagesInAppWorkspaceService,
    implementation: DefaultListPackagesInAppWorkspaceService,
    // TODO: move getApp into a service
    dependencies: [GetApp]
});
