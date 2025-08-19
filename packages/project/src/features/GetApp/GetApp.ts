import { createImplementation } from "@webiny/di-container";
import { GetApp, GetProject } from "~/abstractions/index.js";
import path from "path";
import { AppModel } from "~/models/index.js";

export class DefaultGetApp implements GetApp.Interface {
    constructor(private getProject: GetProject.Interface) {}

    async execute(appName: string) {
        if (!appName) {
            throw new Error("App name must be provided.");
        }

        // App name must be one of the following: core, api, admin, or website.
        const validAppNames = ["core", "api", "admin", "website"];
        if (!validAppNames.includes(appName)) {
            throw new Error(
                `Invalid app name "${appName}". Valid app names are: ${validAppNames.join(", ")}.`
            );
        }

        const project = await this.getProject.execute();

        const workspaceFolderAbsPath = path.join(
            project.paths.workspacesFolder.absolute,
            "apps",
            appName
        );
        const workspaceFolderRelPath = path.relative(
            project.paths.rootFolder.absolute,
            workspaceFolderAbsPath
        );

        const appsFolderAbsPath = path.join(project.paths.appsFolder.absolute, appName);

        const appsFolderRelPath = path.relative(
            project.paths.rootFolder.absolute,
            appsFolderAbsPath
        );

        const localPulumiStateFilesFolderAbsPath = path.join(
            project.paths.localPulumiStateFilesFolder.absolute,
            appsFolderRelPath
        );

        const localPulumiStateFilesFolderRelPath = path.relative(
            project.paths.rootFolder.absolute,
            localPulumiStateFilesFolderAbsPath
        );

        return AppModel.fromDto({
            name: appName,
            paths: {
                appsFolder: {
                    absolute: appsFolderAbsPath,
                    relative: appsFolderRelPath
                },
                workspaceFolder: {
                    absolute: workspaceFolderAbsPath,
                    relative: workspaceFolderRelPath
                },
                localPulumiStateFilesFolder: {
                    absolute: localPulumiStateFilesFolderAbsPath,
                    relative: localPulumiStateFilesFolderRelPath
                }
            }
        });
    }
}

export const getApp = createImplementation({
    abstraction: GetApp,
    implementation: DefaultGetApp,
    dependencies: [GetProject]
});
