import { createCoreApp } from "@webiny/project-aws/apps";
import { getProjectSdk } from "@webiny/project";
import { CorePulumi } from "@webiny/project/abstractions";
import { tagResources } from "@webiny/pulumi-aws";

const sdk = await getProjectSdk();

const pulumiResourceNamePrefix = await sdk.getPulumiResourceNamePrefix();
const productionEnvironments = await sdk.getProductionEnvironments();

export default createCoreApp({
    pulumiResourceNamePrefix,
    productionEnvironments,
    pulumi: async app => {
        const projectConfig = await sdk.getProjectConfig();
        projectConfig.extensionsByType(awsTagsExtension).forEach(ext => {
            tagResources(ext.params.tags);
        });

        const pulumiHandlers = sdk.getContainer().resolve(CorePulumi);
        await pulumiHandlers.execute(app);
    }
});
