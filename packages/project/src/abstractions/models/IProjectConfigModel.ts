import { IHydratedProjectConfig } from "~/abstractions/models/IProjectConfigDto";
import { ExtensionInstanceModel } from "~/extensions/models/index.js";
import { z } from "zod";

export interface IProjectConfigModel {
    config: IHydratedProjectConfig;

    extensionsByType<TParamsSchema extends z.ZodTypeAny>(
        type: string
    ): ExtensionInstanceModel<TParamsSchema>[];
}
