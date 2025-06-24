import path from "path";
import { createImplementation } from "@webiny/di-container";
import { GetAppService } from "~/abstractions";
import { ProjectModel, AppModel } from "~/models";

export class DefaultGetAppService implements GetAppService.Interface {
    execute(project: ProjectModel, appName: string) {
        const workspaceFolderAbsPath = path.join(project.paths.workspacesFolder.absolute, appName);
        const workspaceFolderRelPath = path.relative(
            project.paths.rootFolder.absolute,
            workspaceFolderAbsPath
        );

        const appsFolderAbsPath = path.join(
            project.paths.appsFolder.absolute,
            appName);

        const appsFolderRelPath = path.relative(
            project.paths.rootFolder.absolute,
            appsFolderAbsPath
        );

        return AppModel.fromDto(project, {
            name: appName,
            paths: {
                appsFolder: {
                    absolute: appsFolderAbsPath,
                    relative: appsFolderRelPath
                },
                workspaceFolder: {
                    absolute: workspaceFolderAbsPath,
                    relative: workspaceFolderRelPath
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
