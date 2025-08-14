import { ExtensionDefinitionModel } from "~/extensions/models/index.js";
import { CreateExtensionParams } from "./types";

export function createExtensionDefinition<
    TParams extends Record<string, any> = Record<string, any>
>(extensionParams: CreateExtensionParams<TParams>) {
    const { type, description, multiple, abstraction, build, validate, tags } = extensionParams;

    return new ExtensionDefinitionModel<TParams>({
        type,
        tags,
        description: description || "",
        array: multiple || false,
        abstraction,
        build,
        validate
    });
}
