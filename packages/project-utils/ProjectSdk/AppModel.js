export class AppModel {
    constructor(dto) {
        this.name = dto.name;
        this.paths = dto.paths;
    }

    static fromDto(dto) {
        return new AppModel(dto);
    }
}
