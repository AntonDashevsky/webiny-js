import path from "path";
import { createImplementation } from "@webiny/di-container";
import { GetAppService } from "~/abstractions";
import { ProjectModel, AppModel } from "~/models";

export class DefaultGetAppService implements GetAppService.Interface {
    execute(project: ProjectModel, appName: string) {
        const workspaceFolderAbsPath = path.join(project.paths.workspacesFolder.absolute, 'apps', appName);
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

export const getAppService = createImplementation({
    abstraction: GetAppService,
    implementation: DefaultGetAppService,
    dependencies: []
});
