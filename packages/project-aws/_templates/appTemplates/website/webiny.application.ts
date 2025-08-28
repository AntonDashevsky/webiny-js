import { createWebsiteApp } from "@webiny/project-aws/apps";
import { getProjectSdk } from "@webiny/project";
import { WebsitePulumi } from "@webiny/project/abstractions";
import { tagResources } from "@webiny/pulumi-aws";
import { awsTags as awsTagsExtension } from "@webiny/project-aws/extensions/awsTags";

const sdk = await getProjectSdk();

const pulumiResourceNamePrefix = await sdk.getPulumiResourceNamePrefix();
const productionEnvironments = await sdk.getProductionEnvironments();

export default createWebsiteApp({
    pulumiResourceNamePrefix,
    productionEnvironments,
    pulumi: async app => {
        const projectConfig = await sdk.getProjectConfig();
        projectConfig.extensionsByType(awsTagsExtension).forEach(ext => {
            tagResources(ext.params.tags);
        });

        const pulumiHandlers = sdk.getContainer().resolve(WebsitePulumi);
        await pulumiHandlers.execute(app);
    }
});
