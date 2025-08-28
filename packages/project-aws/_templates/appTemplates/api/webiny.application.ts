import { createApiApp } from "@webiny/project-aws/apps";
import { getProjectSdk } from "@webiny/project";
import { ApiPulumi } from "@webiny/project/abstractions";
import { tagResources } from "@webiny/pulumi-aws";

const sdk = await getProjectSdk();

const pulumiResourceNamePrefix = await sdk.getPulumiResourceNamePrefix();
const productionEnvironments = await sdk.getProductionEnvironments();

export default createApiApp({
    pulumiResourceNamePrefix,
    productionEnvironments,
    pulumi: async app => {
        const awsTags = await sdk.getAwsTags();
        tagResources(awsTags);

        const pulumiHandlers = sdk.getContainer().resolve(ApiPulumi);
        await pulumiHandlers.execute(app);
    }
});
