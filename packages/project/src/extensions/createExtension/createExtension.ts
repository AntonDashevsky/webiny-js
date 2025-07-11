import { createExtensionDefinition } from "./createExtensionDefinition";
import { CreateExtensionParams } from "~/extensions/createExtension/types";
import { createExtensionReactComponent } from "./createExtensionReactComponent";

export function createExtension<TParams extends Record<string, any> = Record<string, any>>(
    extensionParams: CreateExtensionParams<TParams>
) {
    const definition = createExtensionDefinition<TParams>(extensionParams);
    const ReactComponent = createExtensionReactComponent<TParams>(extensionParams);

    return { ReactComponent, definition };
}
