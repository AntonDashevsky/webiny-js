import { IAppModel } from "~/abstractions/models";
import glob from "fast-glob";
import { dirname, join, relative } from "path";
import { PackageJson } from "@webiny/cli/utils/PackageJson";
import { ProjectModel } from "~/models/ProjectModel";

type AppModelDto = Pick<IAppModel, "name" | "paths">;

export class AppModel implements IAppModel {
    public readonly project: ProjectModel;
    public readonly name: IAppModel["name"];
    public readonly paths: IAppModel["paths"];

    private constructor(project: ProjectModel, params: AppModelDto) {
        this.project = project;
        this.name = params.name;
        this.paths = params.paths;
    }

    public async getConfig(): Promise<Record<string, any>> {
        // Implementation for getting the app configuration.
        return {};
    }

    public async getPlugins(): Promise<Record<string, any>> {
        // Implementation for getting the app plugins.
        return {};
    }

    public async getPackages(): Promise<Record<string, any>> {
        // Implementation for getting the app packages.
        const webinyConfigs = await glob(
            join(this.paths.appsFolder.absolute, "**/webiny.config.ts").replace(/\\/g, "/")
        );

        return Promise.all(
            webinyConfigs.map(async config => {
                const dirPath = dirname(config);
                const packageJson = await PackageJson.findClosest(dirPath);
                return {
                    name: packageJson.getJson().name,
                    paths: {
                        absolute: dirname(config),
                        relative: relative(this.project.paths.rootFolder.absolute, dirPath),
                        root: dirname(config),
                        packageJson: packageJson.getLocation(),
                        config
                    },
                    packageJson: packageJson.getJson()
                };
            })
        );
    }

    static fromDto(project: ProjectModel, dto: AppModelDto): IAppModel {
        return new AppModel(project, dto);
    }
}
