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

        return AppModel.fromDto({
            name: appName,
            paths: {
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
