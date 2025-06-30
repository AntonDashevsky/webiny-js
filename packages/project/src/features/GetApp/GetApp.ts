import { createImplementation } from "@webiny/di-container";
import { GetApp, GetAppService, GetProject } from "~/abstractions";
import path from "path";
import { AppModel } from "~/models";

export class DefaultGetApp implements GetApp.Interface {
    constructor(private getProject: GetProject.Interface) {}

    async execute(appName: string) {
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
