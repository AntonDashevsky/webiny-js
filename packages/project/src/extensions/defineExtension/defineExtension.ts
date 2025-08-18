import { DefineExtensionParams } from "~/extensions/defineExtension/types";
import { createExtensionDefinition } from "./createExtensionDefinition";
import { createExtensionReactComponent } from "./createExtensionReactComponent";
import { z } from "zod";

export function defineExtension<TParamsSchema extends z.ZodTypeAny>(
    extensionParams: DefineExtensionParams<TParamsSchema>
) {
    const definition = createExtensionDefinition<TParamsSchema>(extensionParams);
    const ReactComponent = createExtensionReactComponent<TParamsSchema>(extensionParams);

    return { ReactComponent, definition };
}
