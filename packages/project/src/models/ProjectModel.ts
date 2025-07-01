import { IProjectModel } from "~/abstractions/models/index.js";

type ProjectModelDto = IProjectModel;

export class ProjectModel implements IProjectModel {
    public readonly name: string;
    public readonly paths: IProjectModel["paths"];

    private constructor(params: ProjectModelDto) {
        this.name = params.name;
        this.paths = params.paths;
    }

    static fromDto(dto: ProjectModelDto): IProjectModel {
        return new ProjectModel(dto);
    }
}
