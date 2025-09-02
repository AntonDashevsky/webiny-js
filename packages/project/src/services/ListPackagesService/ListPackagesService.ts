import { createImplementation } from "@webiny/di-container";
import { GetApp, GetProjectService, ListPackagesService } from "~/abstractions/index.js";
import fs from "fs";
import path from "path";
import glob from "fast-glob";

export class DefaultListPackagesService implements ListPackagesService.Interface {
    constructor(
        private getProjectService: GetProjectService.Interface,
        private getApp: GetApp.Interface
    ) {}

    async execute(params: ListPackagesService.Params) {
        const { whitelist = [], ...restParams } = params;
        const project = this.getProjectService.execute();
        const app = restParams.app ? this.getApp.execute(restParams.app) : null;

        // List all packages in `packages` folder.
        const packagesFullList: ListPackagesService.Result = fs
            .readdirSync(project.paths.rootFolder.join("packages").toString())
            .map(name => {
                const pkgFolderPath = project.paths.rootFolder.join("/packages/", name).toString();

                let webinyConfigPath = path.join(pkgFolderPath, "webiny.config.ts");
                if (!fs.existsSync(webinyConfigPath)) {
                    webinyConfigPath = path.join(pkgFolderPath, "webiny.config.js");
                }

                return {
                    name,
                    paths: {
                        packageFolder: pkgFolderPath,
                        webinyConfigFile: webinyConfigPath
                    }
                } as ListPackagesService.Package;
            })
            .filter(Boolean);

        if (app) {
            const webinyConfigPaths = glob.sync("**/webiny.config.@(ts|js)", {
                cwd: app.paths.workspaceFolder.toString(),
                absolute: true,
                ignore: ["**/node_modules/**", "**/dist/**"]
            });

            console.log("webinyConfigPaths", webinyConfigPaths);
            const appPackages = webinyConfigPaths.map(webinyConfigPath => {
                const packageFolderPath = path.dirname(webinyConfigPath);
                const packageName = path.basename(packageFolderPath);

                return {
                    name: `@${app.name}/${packageName}`,
                    paths: {
                        packageFolder: packageFolderPath,
                        webinyConfigFile: webinyConfigPath
                    }
                } as ListPackagesService.Package;
            });

            packagesFullList.push(...appPackages);
        }

        if (whitelist.length) {
            return whitelist
                .map(whitelistedPkgName => {
                    return whitelistedPkgName.split(",");
                })
                .flat()
                .map(whitelistedPkgName => whitelistedPkgName.trim())
                .map(whitelistedPkgName => {
                    return packagesFullList.find(pkg => pkg.name === whitelistedPkgName);
                })
                .filter(Boolean) as ListPackagesService.Result;
        }

        if (app) {
            return packagesFullList.filter(pkg => {
                return pkg.name.startsWith(`@${app.name}`);
            });
        }

        throw new Error(`Either "whitelist" or "app" argument must be provided.`);
    }
}

export const listPackagesService = createImplementation({
    abstraction: ListPackagesService,
    implementation: DefaultListPackagesService,
    // TODO: move getApp into a service
    dependencies: [GetProjectService, GetApp]
});
