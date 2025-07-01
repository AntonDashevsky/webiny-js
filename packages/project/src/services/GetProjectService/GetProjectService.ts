import { createImplementation } from "@webiny/di-container";
import { GetProjectService } from "~/abstractions/index.js";
import { ProjectModel } from "~/models/ProjectModel.js";
import findUp from "find-up";
import { dirname, join, relative } from "path";

export class DefaultGetProjectService implements GetProjectService.Interface {
    async execute(cwd = process.cwd()) {
        const manifestFileAbsPath = findUp.sync("webiny.config.ts", { cwd });
        if (!manifestFileAbsPath) {
            throw new Error(`Could not detect project in given directory (${cwd}).`);
        }

        const projectRootFolderAbsPath = dirname(manifestFileAbsPath);
        const projectRootFolderRelPath = "";

        const manifestFileRelPath = "./webiny.config.ts";

        const appsFolderAbsPath = join(projectRootFolderAbsPath, "apps");
        const appsFolderRelPath = relative(projectRootFolderAbsPath, appsFolderAbsPath);

        const workspacesFolderAbsPath = join(projectRootFolderAbsPath, ".webiny", "workspaces");
        const workspacesFolderRelPath = relative(projectRootFolderAbsPath, workspacesFolderAbsPath);

        const localPulumiStateFilesFolderAbsPath = join(projectRootFolderAbsPath, ".pulumi");

        const localPulumiStateFilesFolderRelPath = relative(
            projectRootFolderAbsPath,
            localPulumiStateFilesFolderAbsPath
        );

        return ProjectModel.fromDto({
            name: "webiny-project",
            paths: {
                appsFolder: {
                    absolute: appsFolderAbsPath,
                    relative: appsFolderRelPath
                },
                rootFolder: {
                    absolute: projectRootFolderAbsPath,
                    relative: projectRootFolderRelPath
                },
                manifestFile: {
                    absolute: manifestFileAbsPath,
                    relative: manifestFileRelPath
                },
                workspacesFolder: {
                    absolute: workspacesFolderAbsPath,
                    relative: workspacesFolderRelPath
                },
                localPulumiStateFilesFolder: {
                    absolute: localPulumiStateFilesFolderAbsPath,
                    relative: localPulumiStateFilesFolderRelPath
                }
            }
        });
    }
}

export const getProjectService = createImplementation({
    abstraction: GetProjectService,
    implementation: DefaultGetProjectService,
    dependencies: []
});
