import { type IHydratedProjectConfig, type IProjectConfigModel } from "~/abstractions/models/index.js";
import { type ExtensionInstanceModel } from "~/extensions/models/index.js";
import { type z } from "zod";
import { type DefinitionAndComponentPair } from "~/extensions/index.js";

export class ProjectConfigModel implements IProjectConfigModel {
    public readonly config: IHydratedProjectConfig;

    private constructor(config: IHydratedProjectConfig) {
        this.config = config;
    }

    static create(config: IHydratedProjectConfig) {
        return new ProjectConfigModel(config);
    }

    extensionsByType<TParamsSchema extends z.ZodTypeAny>(
        type: string | DefinitionAndComponentPair<TParamsSchema>
    ): Array<ExtensionInstanceModel<TParamsSchema>> {
        if (typeof type !== "string") {
            type = type.definition.type;
        }
        return (this.config[type] || []) as unknown as Array<ExtensionInstanceModel<TParamsSchema>>;
    }
}
