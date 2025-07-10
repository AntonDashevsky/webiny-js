import { IProjectConfigModel } from "~/abstractions/models/index.js";

type ProjectConfigModelDto = IProjectConfigModel;

export class ProjectConfigModel<TConfig extends Record<string, any> = Record<string, any>>
    implements IProjectConfigModel
{
    public readonly config: TConfig;

    private constructor(dto: TConfig) {
        this.config = dto;
    }

    static fromDto<TConfig extends Record<string, any> = Record<string, any>>(
        dto: TConfig
    ): IProjectConfigModel<TConfig> {
        return new ProjectConfigModel<TConfig>(dto);
    }
}
