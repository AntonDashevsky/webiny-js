import { getProjectSdk } from "@webiny/project";
import { createAdminApp } from "@webiny/project-aws/apps";
import { AdminPulumi } from "@webiny/project/abstractions";
import { tagResources } from "@webiny/pulumi-aws";
import { awsTags as awsTagsExt } from "@webiny/project-aws/extensions/awsTags";

const sdk = await getProjectSdk();

const pulumiResourceNamePrefix = await sdk.getPulumiResourceNamePrefix();
const productionEnvironments = await sdk.getProductionEnvironments();

export default createAdminApp({
    pulumiResourceNamePrefix,
    productionEnvironments,
    pulumi: async app => {
        const projectConfig = await sdk.getProjectConfig();
        projectConfig.extensionsByType(awsTagsExt).forEach(ext => {
            tagResources(ext.params.tags);
        });

        const pulumiHandlers = sdk.getContainer().resolve(AdminPulumi);
        await pulumiHandlers.execute(app);
    }
});
