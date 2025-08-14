import { createCoreApp } from "@webiny/serverless-cms-aws";
import { ProjectSdk } from "@webiny/project";
import { CorePulumi } from "@webiny/project/abstractions";
import { definitions as extensionDefinitions } from "@webiny/extensions/definitions.js";
import { tagResources } from "@webiny/pulumi-aws";

const sdk = await ProjectSdk.init({
    extensions: extensionDefinitions,
    cwd: import.meta.dirname + "/../../../.."
});

const projectConfig = await sdk.getProjectConfig();

let pulumiResourceNamePrefix = "wby-";
const [pulumiResourceNamePrefixExt] = projectConfig.extensionsByType(
    "Deployments/PulumiResourceNamePrefix"
);

if (pulumiResourceNamePrefixExt) {
    pulumiResourceNamePrefix = pulumiResourceNamePrefixExt.params.prefix;
}

let productionEnvironments = ["prod", "production"];
const [productionEnvironmentsExt] = projectConfig.extensionsByType(
    "Deployments/ProductionEnvironments"
);

if (productionEnvironmentsExt) {
    productionEnvironments = productionEnvironmentsExt.params.environments;
}

export default createCoreApp({
    pulumiResourceNamePrefix,
    productionEnvironments,
    pulumi: async app => {
        projectConfig.extensionsByType("Deployments/AwsTags").forEach(ext => {
            tagResources(ext.params.tags);
        });

        const pulumiHandlers = sdk.getContainer().resolve(CorePulumi);
        await pulumiHandlers.execute(app);
    }
});
