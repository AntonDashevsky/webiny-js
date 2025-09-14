import { type IProjectModel, type IProjectModelDto } from "~/abstractions/models/index.js";
import { PathModel } from "./PathModel.js";

export interface ProjectModelConstructorParams {
    name: IProjectModel["name"];
    version?: IProjectModel["version"];
    paths: IProjectModel["paths"];
}

export class ProjectModel implements IProjectModel {
    public readonly name: IProjectModel["name"];
    public readonly paths: IProjectModel["paths"];
    public readonly version: IProjectModel["version"];

    constructor(params: ProjectModelConstructorParams) {
        this.name = params.name;
        this.paths = params.paths;
        this.version = "0.0.0";
    }

    toDto(): IProjectModelDto {
        return {
            name: this.name,
            version: this.version,
            paths: {
                webinyConfigFile: this.paths.webinyConfigFile.toDto(),
                rootFolder: this.paths.rootFolder.toDto(),
                dotWebinyFolder: this.paths.dotWebinyFolder.toDto(),
                workspacesFolder: this.paths.workspacesFolder.toDto(),
                localPulumiStateFilesFolder: this.paths.localPulumiStateFilesFolder.toDto()
            }
        };
    }

    static fromDto(dto: IProjectModelDto): IProjectModel {
        return new ProjectModel({
            name: dto.name,
            version: dto.version,
            paths: {
                webinyConfigFile: PathModel.from(dto.paths.webinyConfigFile),
                rootFolder: PathModel.from(dto.paths.rootFolder),
                dotWebinyFolder: PathModel.from(dto.paths.dotWebinyFolder),
                workspacesFolder: PathModel.from(dto.paths.workspacesFolder),
                localPulumiStateFilesFolder: PathModel.from(dto.paths.localPulumiStateFilesFolder)
            }
        });
    }
}
