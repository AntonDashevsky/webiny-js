import { type DefineExtensionParams } from "~/extensions/defineExtension/types.js";
import { createExtensionDefinition } from "./createExtensionDefinition.js";
import { createExtensionReactComponent } from "./createExtensionReactComponent.js";
import { type z } from "zod";

export interface DefinitionAndComponentPair<TParamsSchema extends z.ZodTypeAny> {
    definition: ReturnType<typeof createExtensionDefinition<TParamsSchema>>;
    ReactComponent: ReturnType<typeof createExtensionReactComponent<TParamsSchema>>;
}

export function defineExtension<TParamsSchema extends z.ZodTypeAny>(
    extensionParams: DefineExtensionParams<TParamsSchema>
) {
    const definition = createExtensionDefinition<TParamsSchema>(extensionParams);
    const ReactComponent = createExtensionReactComponent<TParamsSchema>(extensionParams);

    return { ReactComponent, definition } as DefinitionAndComponentPair<TParamsSchema>;
}
