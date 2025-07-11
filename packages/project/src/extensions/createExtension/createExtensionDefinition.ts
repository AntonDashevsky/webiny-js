import { ExtensionDefinitionModel } from "~/extensions/models/index.js";
import { CreateExtensionParams } from "./types";

export function createExtensionDefinition<
    TParams extends Record<string, any> = Record<string, any>
>(extensionParams: CreateExtensionParams<TParams>) {
    const { type, description, array, abstraction, build, validate } = extensionParams;

    return new ExtensionDefinitionModel<TParams>({
        type,
        description: description || "",
        array: array || false,
        abstraction,
        build,
        validate
    });
}
