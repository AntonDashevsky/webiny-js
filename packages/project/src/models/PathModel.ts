import path from "path";
import { IPathModel } from "~/abstractions/models/index.js";

export class PathModel implements IPathModel {
    constructor(private value: string) {}

    get() {
        return this.value;
    }

    set(path: string) {
        this.value = path;
    }

    join(...paths: string[]) {
        const joinedPath = path.join(this.value, ...paths);
        return PathModel.fromString(joinedPath);
    }

    fromDto(dto: string): IPathModel {
        return new PathModel(dto);
    }

    toString(): string {
        return this.value;
    }

    static fromString(dto: string): IPathModel {
        return new PathModel(dto);
    }
}
