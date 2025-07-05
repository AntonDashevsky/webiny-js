export class ProjectModel {
    constructor(params) {
        this.name = params.name;
        this.paths = params.paths;
    }

    static fromDto(dto) {
        return new ProjectModel(dto);
    }
}
