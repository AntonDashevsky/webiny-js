import type { CreateCorePulumiAppParams } from "@webiny/pulumi-aws/enterprise/index.js";
import type { PluginCollection } from "@webiny/plugins/types.js";

export { CoreOutput, configureAdminCognitoFederation } from "@webiny/pulumi-aws";

export interface CreateCoreAppParams extends CreateCorePulumiAppParams {
    plugins?: PluginCollection;
}

export function createCoreApp(projectAppParams: CreateCoreAppParams = {}) {
    return {
        id: "core",
        name: "Core",
        description: "Your project's stateful cloud infrastructure resources (enterprise).",
        async getPulumi() {
            // eslint-disable-next-line import/dynamic-import-chunkname
            const { createCorePulumiApp } = await import("@webiny/pulumi-aws/enterprise/index");

            return createCorePulumiApp(projectAppParams);
        },
        async getPlugins() {
            const { generateDdbToEsHandler, checkEsServiceRole, checkOsServiceRole } = await import(
                "../core/plugins/index.js"
            );

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

            return [builtInPlugins, customPlugins];
        }
    };
}
