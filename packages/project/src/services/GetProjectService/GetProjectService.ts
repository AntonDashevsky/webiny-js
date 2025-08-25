import { createImplementation } from "@webiny/di-container";
import { GetProjectService } from "~/abstractions/index.js";
import { ProjectModel } from "~/models/ProjectModel.js";
import findUp from "find-up";
import { dirname, join, relative } from "path";

export class DefaultGetProjectService implements GetProjectService.Interface {
    cachedProject: ProjectModel | null = null;

    execute(cwd = process.cwd()) {
        if (this.cachedProject) {
            return this.cachedProject;
        }

        const manifestFileAbsPath = findUp.sync("webiny.config.tsx", { cwd });
        if (!manifestFileAbsPath) {
            throw new Error(`Could not detect project in given directory (${cwd}).`);
        }

        const projectRootFolderAbsPath = dirname(manifestFileAbsPath);
        const projectRootFolderRelPath = "";

        const manifestFileRelPath = "./webiny.config.tsx";

        const dotWebinyAbsPath = join(projectRootFolderAbsPath, ".webiny");
        const dotWebinyFolderRelPath = relative(projectRootFolderAbsPath, dotWebinyAbsPath);

        const workspacesFolderAbsPath = join(projectRootFolderAbsPath, ".webiny", "workspaces");
        const workspacesFolderRelPath = relative(projectRootFolderAbsPath, workspacesFolderAbsPath);

        const localPulumiStateFilesFolderAbsPath = join(projectRootFolderAbsPath, ".pulumi");

        const localPulumiStateFilesFolderRelPath = relative(
            projectRootFolderAbsPath,
            localPulumiStateFilesFolderAbsPath
        );

        this.cachedProject = ProjectModel.fromDto({
            name: "webiny-project",
            paths: {
                dotWebinyFolder: {
                    absolute: dotWebinyAbsPath,
                    relative: dotWebinyFolderRelPath
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

        return this.cachedProject;
    }
}

export const getProjectService = createImplementation({
    abstraction: GetProjectService,
    implementation: DefaultGetProjectService,
    dependencies: []
});
