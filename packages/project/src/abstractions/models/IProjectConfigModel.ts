import { type IHydratedProjectConfig } from "~/abstractions/models/IProjectConfigDto.js";
import { type ExtensionInstanceModel } from "~/extensions/models/index.js";
import { type z } from "zod";
import { type DefinitionAndComponentPair } from "~/extensions/index.js";

export interface IProjectConfigModel {
    config: IHydratedProjectConfig;

    extensionsByType<TParamsSchema extends z.ZodTypeAny>(
        type: string | DefinitionAndComponentPair<TParamsSchema>
    ): ExtensionInstanceModel<TParamsSchema>[];
}
