import { createAdminApp } from "@webiny/project-aws/apps";
import { getProjectSdk } from "@webiny/project";
import { AdminPulumi } from "@webiny/project/abstractions";
import { tagResources } from "@webiny/pulumi-aws";

const sdk = await getProjectSdk();

const pulumiResourceNamePrefix = await sdk.getPulumiResourceNamePrefix();

const productionEnvironments = await sdk.getProductionEnvironments();

export default createAdminApp({
    pulumiResourceNamePrefix,
    productionEnvironments,
    pulumi: async app => {
        const awsTags = await sdk.getAwsTags();
        tagResources(awsTags);

        const pulumiHandlers = sdk.getContainer().resolve(AdminPulumi);
        await pulumiHandlers.execute(app);
    }
});
