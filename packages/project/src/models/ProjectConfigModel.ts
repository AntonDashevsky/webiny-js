import { IHydratedProjectConfig, IProjectConfigModel } from "~/abstractions/models/index.js";
import { ExtensionInstanceModel } from "~/extensions/models/index.js";
import { z } from "zod";

export class ProjectConfigModel implements IProjectConfigModel {
    public readonly config: IHydratedProjectConfig;

    private constructor(config: IHydratedProjectConfig) {
        this.config = config;
    }

    static create(config: IHydratedProjectConfig) {
        return new ProjectConfigModel(config);
    }

    extensionsByType<TParamsSchema extends z.ZodTypeAny>(type: string) {
        return (this.config[type] || []) as unknown as Array<ExtensionInstanceModel<TParamsSchema>>;
    }
}
