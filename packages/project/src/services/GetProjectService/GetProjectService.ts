import { createImplementation } from "@webiny/di-container";
import { GetProjectService } from "~/abstractions";
import { ProjectModel } from "~/models/ProjectModel";
import findUp from "find-up";
import { dirname, join, relative } from "path";

export class DefaultGetProjectService implements GetProjectService.Interface {
    execute(cwd = process.cwd()) {
        const manifestFileAbsPath = findUp.sync("webiny.config.ts", { cwd });
        if (!manifestFileAbsPath) {
            throw new Error(`Could not detect project in given directory (${cwd}).`);
        }

        const projectRootFolderAbsPath = dirname(manifestFileAbsPath);
        const projectRootFolderRelPath = '';

        const manifestFileRelPath = './webiny.config.ts';

        const workspacesFolderAbsPath = join(projectRootFolderAbsPath, ".webiny", "workspaces");
        const workspacesFolderRelPath = relative(projectRootFolderAbsPath, workspacesFolderAbsPath);

        return ProjectModel.fromDto({
            paths: {
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
                }
            }
        });

        // let projectlicationConfig = await import(rootFile).then(m => m.default ?? m);
        //
        // return new ProjectModel({
        //     config: {
        //         ...projectlicationConfig,
        //         getPlugins: async () => {
        //             return projectlicationConfig.getPlugins ? projectlicationConfig.getPlugins() : [];
        //         }
        //     }
        //     // project: project // Assuming `project` is defined in the context where this method is called
        // }
        //
        // return ProjectModel.load(cwd);
    }
}

export const getProjectService = createImplementation({
    abstraction: GetProjectService,
    implementation: DefaultGetProjectService,
    dependencies: []
});
