import { createImplementation } from "@webiny/di-container";
import findUp from "find-up";
import { dirname } from "path";
import { GetProjectService } from "~/abstractions/index.js";
import { ProjectModel } from "~/models/ProjectModel.js";
import { PathModel } from "~/models/PathModel";

export class DefaultGetProjectService implements GetProjectService.Interface {
    cachedProject: ProjectModel | null = null;

    execute(cwd = process.cwd()) {
        if (this.cachedProject) {
            return this.cachedProject;
        }

        const webinyConfigFilePathString = findUp.sync("webiny.config.tsx", { cwd });
        if (!webinyConfigFilePathString) {
            throw new Error(`Could not detect project in given directory (${cwd}).`);
        }

        const webinyConfigFilePath = PathModel.fromString(webinyConfigFilePathString);
        const projectRootFolderPath = PathModel.fromString(
            dirname(webinyConfigFilePathString.toString())
        );
        const dotWebinyFolderPath = projectRootFolderPath.join(".webiny");
        const workspacesFolderPath = projectRootFolderPath.join(".webiny", "workspaces");
        const localPulumiStateFilesFolderPath = projectRootFolderPath.join(".pulumi");

        this.cachedProject = ProjectModel.fromDto({
            name: "webiny-project",
            paths: {
                dotWebinyFolder: dotWebinyFolderPath,
                rootFolder: projectRootFolderPath,
                webinyConfigFile: webinyConfigFilePath,
                workspacesFolder: workspacesFolderPath,
                localPulumiStateFilesFolder: localPulumiStateFilesFolderPath
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
