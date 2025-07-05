import findUp from "find-up";
import path from "path";
import { ProjectModel } from "./ProjectModel.js";
import { AppModel } from "./AppModel.js";

export class ProjectSdk {
    constructor(cwd) {
        this.cwd = cwd || process.cwd();
    }

    static init(cwd) {
        return new ProjectSdk(cwd);
    }

    async getProject() {
        const cwd = this.cwd;
        const manifestFileAbsPath = findUp.sync("webiny.config.ts", { cwd });
        if (!manifestFileAbsPath) {
            throw new Error(`Could not detect project in given directory (${cwd}).`);
        }

        const projectRootFolderAbsPath = path.dirname(manifestFileAbsPath);
        const projectRootFolderRelPath = "";

        const manifestFileRelPath = "./webiny.config.ts";

        const appsFolderAbsPath = path.join(projectRootFolderAbsPath, "apps");
        const appsFolderRelPath = path.relative(projectRootFolderAbsPath, appsFolderAbsPath);

        const workspacesFolderAbsPath = path.join(projectRootFolderAbsPath, ".webiny", "workspaces");
        const workspacesFolderRelPath = path.relative(projectRootFolderAbsPath, workspacesFolderAbsPath);

        const localPulumiStateFilesFolderAbsPath = path.join(projectRootFolderAbsPath, ".pulumi");

        const localPulumiStateFilesFolderRelPath = path.relative(
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

    async getApp(appNameOrPath) {
        let appName = appNameOrPath;
        if (appNameOrPath.startsWith("/")) {
            const webinyApplicationTsPath = findUp.sync("webiny.application.ts", {
                cwd: appNameOrPath
            });
            appName = path.dirname(webinyApplicationTsPath);
        }

        const project = await this.getProject();

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
