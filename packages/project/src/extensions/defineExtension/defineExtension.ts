import { DefineExtensionParams } from "~/extensions/defineExtension/types.js";
import { createExtensionDefinition } from "./createExtensionDefinition.js";
import { createExtensionReactComponent } from "./createExtensionReactComponent.js";
import { z } from "zod";

export function defineExtension<TParamsSchema extends z.ZodTypeAny>(
    extensionParams: DefineExtensionParams<TParamsSchema>
) {
    const definition = createExtensionDefinition<TParamsSchema>(extensionParams);
    const ReactComponent = createExtensionReactComponent<TParamsSchema>(extensionParams);

    return { ReactComponent, definition };
}
