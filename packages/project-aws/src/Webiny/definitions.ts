import {
    definitions as projectDefinitions,
    type ExtensionDefinitionModel
} from "@webiny/project/extensions/index.js";
import { definitions as cliDefinitions } from "@webiny/cli-core/extensions/index.js";
import { definitions as cmsDefinitions } from "@webiny/api-headless-cms/extensions/index.js";
import { definitions as adminDefinitions } from "@webiny/app-admin/extensions/index.js";
import { definitions as apiDefinitions } from "@webiny/api/extensions/index.js";
import { definitions as projectAws } from "~/pulumi/extensions/index.js";

const definitions = [
    ...cliDefinitions,
    ...projectDefinitions,
    ...cmsDefinitions,
    ...adminDefinitions,
    ...apiDefinitions,
    ...projectAws
] as unknown as ExtensionDefinitionModel<any>[];

export default definitions;
