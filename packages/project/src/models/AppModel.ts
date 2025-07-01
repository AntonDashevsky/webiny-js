import { IAppModel } from "~/abstractions/models/index.js";

type AppModelDto = Pick<IAppModel, "name" | "paths">;

export class AppModel implements IAppModel {
    public readonly name: IAppModel["name"];
    public readonly paths: IAppModel["paths"];

    private constructor(dto: AppModelDto) {
        this.name = dto.name;
        this.paths = dto.paths;
    }

    public async getConfig(): Promise<Record<string, any>> {
        // Implementation for getting the app configuration.
        return {};
    }

    public async getPlugins(): Promise<Record<string, any>> {
        // Implementation for getting the app plugins.
        return {};
    }

    static fromDto(dto: AppModelDto): IAppModel {
        return new AppModel(dto);
    }
}
