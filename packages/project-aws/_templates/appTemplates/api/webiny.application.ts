import { createApiApp } from "@webiny/project-aws/apps/enterprise";
import { getProjectSdk } from "@webiny/project";
import { ApiPulumi } from "@webiny/project/abstractions";
import { tagResources } from "@webiny/pulumi-aws";
import { awsTags as awsTagsExt } from "@webiny/project-aws/extensions/awsTags";
import { vpc as vpcExt } from "@webiny/project-aws/extensions/vpc";
import { CreateApiPulumiAppParams } from "@webiny/pulumi-aws/enterprise";

const sdk = await getProjectSdk();

const pulumiResourceNamePrefix = await sdk.getPulumiResourceNamePrefix();
const productionEnvironments = await sdk.getProductionEnvironments();

const projectConfig = await sdk.getProjectConfig();

let vpc: CreateApiPulumiAppParams["vpc"];

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
        vpc = {};
        if (useVpcEndpoints) {
            vpc.useVpcEndpoints = useVpcEndpoints;
        }

        if (useExistingVpc) {
            vpc.useExistingVpc = useExistingVpc;
        }
    }
}

export default createApiApp({
    pulumiResourceNamePrefix,
    productionEnvironments,
    vpc,
    pulumi: async app => {
        projectConfig.extensionsByType(awsTagsExt).forEach(ext => {
            tagResources(ext.params.tags);
        });

        const pulumiHandlers = sdk.getContainer().resolve(ApiPulumi);
        await pulumiHandlers.execute(app);
    }
});
