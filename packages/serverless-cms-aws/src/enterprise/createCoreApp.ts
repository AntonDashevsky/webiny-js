import { createCorePulumiApp, CreateCorePulumiAppParams } from "@webiny/pulumi-aws/enterprise/index.js";
import { PluginCollection } from "@webiny/plugins/types.js";
import { generateDdbToEsHandler, checkEsServiceRole, checkOsServiceRole } from "~/core/plugins/index.js";

export { CoreOutput, configureAdminCognitoFederation } from "@webiny/pulumi-aws";

export interface CreateCoreAppParams extends CreateCorePulumiAppParams {
    plugins?: PluginCollection;
}

export function createCoreApp(projectAppParams: CreateCoreAppParams = {}) {
    const builtInPlugins = [];
    if (projectAppParams.elasticSearch || projectAppParams.openSearch) {
        builtInPlugins.push(generateDdbToEsHandler);
        if (projectAppParams.elasticSearch) {
            builtInPlugins.push(checkEsServiceRole);
        } else {
            builtInPlugins.push(checkOsServiceRole);
        }
    }

    const customPlugins = projectAppParams.plugins ? [...projectAppParams.plugins] : [];

    return {
        id: "core",
        name: "Core",
        description: "Your project's stateful cloud infrastructure resources.",
        pulumi: createCorePulumiApp(projectAppParams),
        plugins: [builtInPlugins, customPlugins]
    };
}
