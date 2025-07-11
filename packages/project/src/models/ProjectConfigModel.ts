import { IHydratedProjectConfig, IProjectConfigModel } from "~/abstractions/models/index.js";
import { ExtensionDefinition } from "~/createExtension";

export class ProjectConfigModel implements IProjectConfigModel {
    public readonly config: IHydratedProjectConfig;

    private constructor(config: IHydratedProjectConfig) {
        this.config = config;
    }

    static create(config: IHydratedProjectConfig) {
        return new ProjectConfigModel(config);
    }

    extensionsByType<TParams extends Record<string, any> = Record<string, any>>(type: string) {
        return (this.config[type] || []) as unknown as Array<ExtensionDefinition<TParams>>;
    }
}
