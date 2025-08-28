import { createWebsiteApp } from "@webiny/project-aws/apps";
import { getProjectSdk } from "@webiny/project";
import { WebsitePulumi } from "@webiny/project/abstractions";
import { tagResources } from "@webiny/pulumi-aws";

const sdk = await getProjectSdk();

const pulumiResourceNamePrefix = await sdk.getPulumiResourceNamePrefix();
const productionEnvironments = await sdk.getProductionEnvironments();

export default createWebsiteApp({
    pulumiResourceNamePrefix,
    productionEnvironments,
    pulumi: async app => {
        const awsTags = await sdk.getAwsTags();
        tagResources(awsTags);

        const pulumiHandlers = sdk.getContainer().resolve(WebsitePulumi);
        await pulumiHandlers.execute(app);
    }
});
