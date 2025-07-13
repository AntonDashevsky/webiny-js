import { ExtensionDefinitionModel } from "@webiny/project/extensions/index.js";
import { definitions as cliDefinitions } from "@webiny/cli-core/extensions/index.js";

// Note that project definitions are not imported/exported here because these are already
// registered within the `@webiny/project` package, and we don't want to duplicate them
// (although we still export React components in the `index.ts` file of this package).
export const definitions = [...cliDefinitions] as unknown as ExtensionDefinitionModel[];
