import { createImplementation } from "@webiny/di-container";
import { GetApp, GetProjectService, ListPackagesService } from "~/abstractions/index.js";
import execa from "execa";
import fs from "fs";
import path from "path";
import { requireConfig } from "~/utils";

export type IYarnWorkspacesResult = {
    name: string;
    location: string;
};

export class DefaultListPackagesService implements ListPackagesService.Interface {
    constructor(
        private getProjectService: GetProjectService.Interface,
        private getApp: GetApp.Interface
    ) {}

    async execute(params: ListPackagesService.Params) {
        const { whitelist, ...restParams } = params;
        const project = await this.getProjectService.execute();

        const workspacesList = (await execa("yarn", [
            "workspaces",
            "list",
            "--json",
            "--verbose"
        ]).then(({ stdout }) => {
            return stdout
                .split("\n") // split into lines
                .filter(Boolean) // remove any empty lines
                .map(line => JSON.parse(line)); // parse each JSON line
        })) as IYarnWorkspacesResult[];

        // We first gather a list of package names and their locations.
        let filteredWorkspacesList: IYarnWorkspacesResult[] = [];
        if (whitelist) {
            const whitelistArray = Array.isArray(whitelist) ? [...whitelist] : [whitelist];

            // Also split by commas.
            filteredWorkspacesList = whitelistArray
                .map(item => item.split(","))
                .flat()
                .map(pkg => pkg.trim())
                .map(item => {
                    // Search for the package in the yarn workspaces list.
                    // When providing packages manually, we also allow providing names of Webiny packages
                    // without the `@webiny` scope. That's why we check for both the package name
                    // and the Webiny prefixed package name.
                    return workspacesList.find(
                        ws => ws.name === item || ws.name === `@webiny/${item}`
                    );
                })
                .filter(Boolean) as IYarnWorkspacesResult[];
        } else if (restParams.app) {
            const app = await this.getApp.execute(restParams.app);
            filteredWorkspacesList = workspacesList.filter(ws =>
                ws.location.startsWith(app.paths.appsFolder.relative)
            );
        }

        const packages: ListPackagesService.Package[] = [];

        for (const ws of filteredWorkspacesList) {
            const packageFolderPath = path.join(project.paths.rootFolder.absolute, ws.location);
            const webinyConfigTsPath = path.join(packageFolderPath, "webiny.config.ts");
            const webinyConfigJsPath = path.join(packageFolderPath, "webiny.config.js");
            const webinyConfigPath = fs.existsSync(webinyConfigTsPath)
                ? webinyConfigTsPath
                : webinyConfigJsPath;

            // We need this because newly introduced extension
            // packages do not have a Webiny config file.
            if (!fs.existsSync(webinyConfigPath)) {
                continue;
            }

            const webinyConfig = await requireConfig(webinyConfigPath);

            packages.push({
                name: ws.name,
                webinyConfig,
                paths: {
                    packageFolder: packageFolderPath,
                    webinyConfigFile: webinyConfigPath
                }
            });
        }

        return packages;
    }
}

export const listPackagesService = createImplementation({
    abstraction: ListPackagesService,
    implementation: DefaultListPackagesService,
    // TODO: move getApp into a service
    dependencies: [GetProjectService, GetApp]
});
