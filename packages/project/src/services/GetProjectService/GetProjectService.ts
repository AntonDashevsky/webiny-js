import { createImplementation } from "@webiny/di-container";
import findUp from "find-up";
import { dirname } from "path";
import { GetProjectService, GetProjectVersionService } from "~/abstractions/index.js";
import { ProjectModel } from "~/models/ProjectModel.js";
import { PathModel } from "~/models/PathModel.js";
import path from "path";

export class DefaultGetProjectService implements GetProjectService.Interface {
    cachedProject: ProjectModel | null = null;

    constructor(private getProjectVersionService: GetProjectVersionService.Interface) {}

    execute(cwd = process.cwd()) {
        if (this.cachedProject) {
            return this.cachedProject;
        }

        const webinyConfigFilePathString = findUp.sync("webiny.config.tsx", { cwd });
        if (!webinyConfigFilePathString) {
            throw new Error(`Could not detect project in given directory (${cwd}).`);
        }

        const webinyConfigFilePath = PathModel.from(webinyConfigFilePathString);
        const projectRootFolderPath = PathModel.from(
            dirname(webinyConfigFilePathString.toString())
        );
        const dotWebinyFolderPath = projectRootFolderPath.join(".webiny");
        const workspacesFolderPath = projectRootFolderPath.join(".webiny", "workspaces");
        const localPulumiStateFilesFolderPath = projectRootFolderPath.join(".pulumi");

        const projectVersion = this.getProjectVersionService.execute(cwd);

        this.cachedProject = new ProjectModel({
            // TODO: read project name from config file.
            name: path.basename(projectRootFolderPath.toString()),
            version: projectVersion,
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
    dependencies: [GetProjectVersionService]
});
