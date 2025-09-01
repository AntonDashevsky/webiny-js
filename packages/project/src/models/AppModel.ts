import { IAppModel, IAppModelDto } from "~/abstractions/models/index.js";
import { GetApp } from "~/abstractions";
import { PathModel } from "./PathModel";

export class AppModel implements IAppModel {
    public readonly name: GetApp.AppName;
    public readonly paths: IAppModel["paths"];

    private constructor(dto: IAppModelDto) {
        this.name = dto.name;
        this.paths = {
            workspaceFolder: PathModel.fromString(dto.paths.workspaceFolder),
            localPulumiStateFilesFolder: PathModel.fromString(dto.paths.localPulumiStateFilesFolder)
        };
    }

    public async getConfig(): Promise<Record<string, any>> {
        // Implementation for getting the app configuration.
        return {};
    }

    public async getPlugins(): Promise<Record<string, any>> {
        // Implementation for getting the app plugins.
        return {};
    }

    static fromDto(dto: IAppModelDto): IAppModel {
        return new AppModel(dto);
    }
}
