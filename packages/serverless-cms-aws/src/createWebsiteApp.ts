import type { CreateWebsitePulumiAppParams } from "@webiny/pulumi-aws";
import { createWebsitePulumiApp } from "@webiny/pulumi-aws";
import type { PluginCollection } from "@webiny/plugins/types";
import type { IRenderWebsiteParams } from "./website/plugins";
import {
    generateCommonHandlers,
    lambdaEdgeWarning,
    renderWebsite,
    telemetryNoLongerNewUser
} from "./website/plugins";
import { createEnsureApiDeployedPlugins } from "~/utils/ensureApiDeployed";

import { uploadAppToS3 } from "./react/plugins";

export interface CreateWebsiteAppParams extends CreateWebsitePulumiAppParams {
    renderWebsiteAfterDeploy?: (params: IRenderWebsiteParams) => boolean;
    plugins?: PluginCollection;
}

export function createWebsiteApp(projectAppParams: CreateWebsiteAppParams = {}) {
    const builtInPlugins = [
        uploadAppToS3({ folder: "apps/website" }),
        generateCommonHandlers,
        lambdaEdgeWarning,
        renderWebsite({ prerender: projectAppParams.renderWebsiteAfterDeploy ?? (() => true) }),
        telemetryNoLongerNewUser,
        ...createEnsureApiDeployedPlugins("website")
    ];

    const customPlugins = projectAppParams.plugins ? [...projectAppParams.plugins] : [];

    return {
        id: "website",
        name: "Website",
        description: "Your project's public website.",
        cli: {
            // Default args for the "yarn webiny watch ..." command (we don't need the deploy option while developing).
            watch: {
                // We disable local development for all AWS Lambda functions.
                // This can be changed down the line by passing another set of values
                // to the "watch" command (for example `-f ps-render-subscriber`).
                function: "none",

                // We can remove this once the new watch command is released.
                deploy: false
            }
        },
        pulumi: createWebsitePulumiApp(projectAppParams),
        plugins: [builtInPlugins, customPlugins]
    };
}
