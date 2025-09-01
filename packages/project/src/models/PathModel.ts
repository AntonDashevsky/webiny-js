import path from "path";
import { IPathModel, IPathModelDto } from "~/abstractions/models/index.js";

export class PathModel implements IPathModel {
    constructor(private value: string) {}

    join(...paths: string[]) {
        const joinedPath = path.join(this.value, ...paths);
        return PathModel.from(joinedPath);
    }

    toString(): string {
        return this.value;
    }

    toDto(): IPathModelDto {
        return { value: this.value };
    }

    static from(value: string | IPathModelDto | PathModel): PathModel {
        if (value instanceof PathModel) {
            return value;
        }

        if (typeof value === "string") {
            return new PathModel(value);
        }

        return new PathModel(value.value);
    }
}
