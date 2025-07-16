import { IHydratedProjectConfig } from "~/abstractions/models/IProjectConfigDto";
import { ExtensionInstanceModel } from "~/extensions/models/index.js";

export interface IProjectConfigModel {
    config: IHydratedProjectConfig;

    extensionsByType<TParams extends Record<string, any> = Record<string, any>>(
        type: string
    ): ExtensionInstanceModel<TParams>[];
}
