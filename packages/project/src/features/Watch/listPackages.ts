import execa from "execa";
import fs from "fs";
import path from "path";
import { AppModel, ProjectModel } from "~/models";
import { Watch } from "~/abstractions";
import { requireConfig } from "~/utils";

export type IYarnWorkspacesResult = {
    name: string;
    location: string;
};

export interface IListPackagesPackage {
    name: string;
    webinyConfig: Record<string, any>;
    paths: {
        packageFolder: string;
        webinyConfigFile: string;
    };
}

export interface IListPackagesParams {
    watchParams: Watch.Params;
    project: ProjectModel;
    app?: AppModel;
}

export const listPackages = async (params: IListPackagesParams) => {
    const { watchParams, app, project } = params;

    const workspacesList = (await execa("yarn", ["workspaces", "list", "--json", "--verbose"]).then(
        ({ stdout }) => {
            return stdout
                .split("\n") // split into lines
                .filter(Boolean) // remove any empty lines
                .map(line => JSON.parse(line)); // parse each JSON line
        }
    )) as IYarnWorkspacesResult[];

    // We first gather a list of package names and their locations.
    let filteredWorkspacesList: IYarnWorkspacesResult[] = [];
    if (watchParams.package) {
        const packageParamArray = Array.isArray(watchParams.package)
            ? [...watchParams.package]
            : [watchParams.package];

        // Also split by commas.
        filteredWorkspacesList = packageParamArray
            .map(item => item.split(","))
            .flat()
            .map(pkg => pkg.trim())
            .map(item => {
                // Search for the package in the yarn workspaces list.
                // When providing packages manually, we also allow providing names of Webiny packages
                // without the `@webiny` scope. That's why we check for both the package name
                // and the Webiny prefixed package name.
                return workspacesList.find(ws => ws.name === item || ws.name === `@webiny/${item}`);
            })
            .filter(Boolean) as IYarnWorkspacesResult[];
    } else if (app) {
        filteredWorkspacesList = workspacesList.filter(ws =>
            ws.location.startsWith(app.paths.appsFolder.relative)
        );
    }

    const packages: IListPackagesPackage[] = [];

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
};
