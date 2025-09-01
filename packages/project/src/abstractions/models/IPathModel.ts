export interface IPathModel {
    get(): string;
    set(path: string): void;
    toString(): string;
    fromDto(dto: string): IPathModel;
    join: (...paths: string[]) => IPathModel;
}
