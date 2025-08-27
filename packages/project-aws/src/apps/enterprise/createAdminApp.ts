// @ts-nocheck
import {
    createAdminPulumiApp,
    type CreateAdminPulumiAppParams
} from "@webiny/pulumi-aws/enterprise/index.js";
import { uploadAppToS3 } from "~/react/plugins/index.js";
import { type PluginCollection } from "@webiny/plugins/types.js";
import { createEnsureApiDeployedPlugins } from "~/utils/ensureApiDeployed.js";

export interface CreateAdminAppParams extends CreateAdminPulumiAppParams {
    plugins?: PluginCollection;
}

export function createAdminApp(projectAppParams: CreateAdminAppParams = {}) {
    const builtInPlugins = [
        uploadAppToS3({ folder: "apps/admin" }),
        ...createEnsureApiDeployedPlugins("admin")
    ];

    const customPlugins = projectAppParams.plugins ? [...projectAppParams.plugins] : [];

    return {
        id: "admin",
        name: "Admin",
        description: "Your project's admin area§.",
        cli: {
            // Default args for the "yarn webiny watch ..." command (we don't need deploy option while developing).
            watch: {
                deploy: false
            }
        },
        pulumi: createAdminPulumiApp(projectAppParams),
        plugins: [builtInPlugins, customPlugins]
    };
}
