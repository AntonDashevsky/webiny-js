import { IHydratedProjectConfig } from "~/abstractions/models/IProjectConfigDto.js";
import { ExtensionInstanceModel } from "~/extensions/models/index.js";
import { z } from "zod";
import { DefinitionAndComponentPair } from "~/extensions/index.js";

export interface IProjectConfigModel {
    config: IHydratedProjectConfig;

    extensionsByType<TParamsSchema extends z.ZodTypeAny>(
        type: string | DefinitionAndComponentPair<TParamsSchema>
    ): ExtensionInstanceModel<TParamsSchema>[];
}
