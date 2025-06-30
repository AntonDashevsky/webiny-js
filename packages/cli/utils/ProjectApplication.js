import { dirname, basename, join, relative } from "path";
import findUp from "find-up";
import glob from "fast-glob";
import { PackageJson } from "./PackageJson.js";

const appConfigs = ["webiny.application.js", "webiny.application.ts"];

export class ProjectApplication {
    static async loadFromDirectory(project, directory) {
        const cwd = directory;

        // Using "Pulumi.yaml" for the backwards compatibility.
        const applicationRootFile = await findUp(appConfigs.concat("Pulumi.yaml"), { cwd });

        if (!applicationRootFile) {
            throw new Error(`Could not detect project application in given directory (${cwd}).`);
        }

        const rootFile = applicationRootFile.replace(/\\/g, "/");
        const projectAppRootPath = dirname(rootFile);

        let applicationConfig;
        if (appConfigs.includes(basename(rootFile))) {
            applicationConfig = await import(rootFile).then(m => m.default ?? m);
        }

        let id, name, description;
        if (applicationConfig) {
            id = applicationConfig.id;
            name = applicationConfig.name;
            description = applicationConfig.description;
        } else {
            name = basename(projectAppRootPath);
            description = name;
            id = name;
        }

        const projectAppRelativePath = relative(project.root, projectAppRootPath);
        const projectAppWorkspacePath = join(
            project.root,
            ".webiny",
            "workspaces",
            projectAppRelativePath
        );

        return {
            id,
            name,
            description,
            root: projectAppRootPath,
            paths: {
                relative: projectAppRelativePath,
                absolute: projectAppRootPath,
                workspace: projectAppWorkspacePath
            },
            config: {
                ...applicationConfig,
                getPlugins: async () => {
                    return applicationConfig.getPlugins ? applicationConfig.getPlugins() : [];
                }
            },
            project,
            getPackages: async () => {
                const webinyConfigs = await glob(
                    join(projectAppRootPath, "**/webiny.config*.{ts,js}").replace(/\\/g, "/")
                );

                return await Promise.all(
                    webinyConfigs.map(async config => {
                        const dirPath = dirname(config);
                        const packageJson = await PackageJson.findClosest(dirPath);
                        return {
                            name: packageJson.getJson().name,
                            paths: {
                                absolute: dirname(config),
                                relative: relative(project.root, dirPath),
                                root: dirname(config),
                                packageJson: packageJson.getLocation(),
                                config
                            },
                            packageJson: packageJson.getJson()
                        };
                    })
                );
            }
        };
    }
}
