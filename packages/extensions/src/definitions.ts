import { definitions as cliDefinitions } from "@webiny/cli-core/extensions/index.js";
import { ExtensionDefinitionClass } from "@webiny/project";

export const definitions = [...cliDefinitions] as unknown as ExtensionDefinitionClass[];
