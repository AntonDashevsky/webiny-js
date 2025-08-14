import { CreateExtensionParams } from "~/extensions/defineExtension/types";
import { createExtensionDefinition } from "./createExtensionDefinition";
import { createExtensionReactComponent } from "./createExtensionReactComponent";

export function defineExtension<TParams extends Record<string, any> = Record<string, any>>(
    extensionParams: CreateExtensionParams<TParams>
) {
    const definition = createExtensionDefinition<TParams>(extensionParams);
    const ReactComponent = createExtensionReactComponent<TParams>(extensionParams);

    return { ReactComponent, definition };
}
