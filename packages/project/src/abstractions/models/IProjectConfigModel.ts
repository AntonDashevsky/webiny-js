import { IHydratedProjectConfig } from "~/abstractions/models/IProjectConfigDto";
import { ExtensionDefinition } from "~/createExtension";

export interface IProjectConfigModel {
    config: IHydratedProjectConfig;

    extensionsByType<TParams extends Record<string, any> = Record<string, any>>(
        type: string
    ): Array<ExtensionDefinition<TParams>>;
}
