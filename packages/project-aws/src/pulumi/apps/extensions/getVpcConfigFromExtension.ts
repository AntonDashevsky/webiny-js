import { vpc as vpcExt } from "~/pulumi/extensions/vpc.js";
import { IProjectConfigModel } from "@webiny/project/abstractions/models";

export const getVpcConfigFromExtension = (projectConfig: IProjectConfigModel) => {
    const [vpcExtension] = projectConfig.extensionsByType(vpcExt);
    if (!vpcExtension) {
        // VPC automatically used with production environments.
        return undefined;
    }

    const { enabled, useVpcEndpoints, useExistingVpc } = vpcExtension.params;
    if (enabled === false) {
        return false;
    }

    if (useVpcEndpoints || useExistingVpc) {
        let vpc: Omit<typeof vpcExtension.params, "enabled"> = {};

        if (useVpcEndpoints) {
            vpc.useVpcEndpoints = useVpcEndpoints;
        }

        if (useExistingVpc) {
            vpc.useExistingVpc = useExistingVpc;
        }

        return vpc;
    }

    return true;
};
