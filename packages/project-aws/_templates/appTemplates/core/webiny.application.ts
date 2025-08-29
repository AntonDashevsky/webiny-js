import { createCoreApp } from "@webiny/project-aws/apps/enterprise";
import { getProjectSdk } from "@webiny/project";
import { CorePulumi } from "@webiny/project/abstractions";
import { tagResources } from "@webiny/pulumi-aws";
import { vpc as vpcExt } from "@webiny/project-aws/extensions/vpc";
import { awsTags as awsTagsExt } from "@webiny/project-aws/extensions/awsTags";
import { CreateCorePulumiAppParams } from "@webiny/pulumi-aws/enterprise";

const sdk = await getProjectSdk();

const pulumiResourceNamePrefix = await sdk.getPulumiResourceNamePrefix();
const productionEnvironments = await sdk.getProductionEnvironments();

const projectConfig = await sdk.getProjectConfig();

let vpc: CreateCorePulumiAppParams["vpc"];

vpcBlock: {
    const [vpcExtension] = projectConfig.extensionsByType(vpcExt);
    if (!vpcExtension) {
        break vpcBlock;
    }

    const { enabled, useVpcEndpoints, useExistingVpc } = vpcExtension.params;
    if (enabled === false) {
        vpc = false;
        break vpcBlock;
    }

    vpc = true;
    if (useVpcEndpoints || useExistingVpc) {
        vpc = { useVpcEndpoints, useExistingVpc };
    }
}

export default createCoreApp({
    pulumiResourceNamePrefix,
    productionEnvironments,
    vpc,
    pulumi: async app => {
        projectConfig.extensionsByType(awsTagsExt).forEach(ext => {
            tagResources(ext.params.tags);
        });

        const pulumiHandlers = sdk.getContainer().resolve(CorePulumi);
        await pulumiHandlers.execute(app);
    }
});
