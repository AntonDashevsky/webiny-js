import { type ExtensionDefinitionModel } from "@webiny/project/extensions/index.js";
import { definitions as cliDefinitions } from "@webiny/cli-core/extensions/index.js";
import { definitions as projectDefinitions } from "@webiny/project/extensions/index.js";

export const definitions = [
    ...cliDefinitions,
    ...projectDefinitions
] as unknown as ExtensionDefinitionModel[];
