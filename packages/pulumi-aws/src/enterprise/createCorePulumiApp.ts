import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import {
    createCorePulumiApp as baseCreateCorePulumiApp,
    type CreateCorePulumiAppParams as BaseCreateCorePulumiAppParams
} from "~/apps/core/createCorePulumiApp.js";
import { isResourceOfType, type PulumiAppParam } from "@webiny/pulumi";
import { getAwsRegion } from "~/apps/awsUtils.js";
import { configureS3BucketMalwareProtection } from "~/enterprise/core/configureS3BucketMalwareProtection.js";
import { License } from "@webiny/wcp";
import { getVpcConfigFromExtension } from "./extensions/getVpcConfigFromExtension";
import { getEsConfigFromExtension } from "./extensions/getEsConfigFromExtension";
import { getOsConfigFromExtension } from "./extensions/getOsConfigFromExtension";
import { getProjectSdk } from "@webiny/project";
import { awsTags as awsTagsExt } from "~/extensions/awsTags";
import { tagResources } from "~/utils";
import { CorePulumi } from "@webiny/project/abstractions";

export type CorePulumiApp = ReturnType<typeof createCorePulumiApp>;

export type CorePulumiAppAdvancedVpcParams = Partial<{
    useVpcEndpoints: boolean;
    useExistingVpc: {
        elasticSearchDomainVpcConfig?: aws.types.input.elasticsearch.DomainVpcOptions;
        openSearchDomainVpcConfig?: aws.types.input.opensearch.DomainVpcOptions;
        lambdaFunctionsVpcConfig: aws.types.input.lambda.FunctionVpcConfig;
    };
}>;

const sdk = await getProjectSdk();
const projectConfig = await sdk.getProjectConfig();

export function createCorePulumiApp() {
    const vpc = getVpcConfigFromExtension(projectConfig);
    const elasticSearch = getEsConfigFromExtension(projectConfig);
    const openSearch = getOsConfigFromExtension(projectConfig);

    return baseCreateCorePulumiApp({
        elasticSearch,
        openSearch,
        // If using existing VPC, we ensure `vpc` param is set to `false`.
        vpc: () => {
            if (!vpc) {
                // This could be `false` or `undefined`. If `undefined`, down the line,
                // this means "deploy into VPC if dealing with a production environment".
                return vpc;
            }

            // If using an existing VPC, we ensure Webiny does not deploy its own VPC.
            const usingAdvancedVpcParams = typeof vpc !== "boolean";
            if (usingAdvancedVpcParams && vpc.useExistingVpc) {
                return false;
            }

            return true;
        },
        async pulumi(app) {
            const defaultPulumi = () => {
                projectConfig.extensionsByType(awsTagsExt).forEach(ext => {
                    tagResources(ext.params.tags);
                });

                const pulumiHandlers = sdk.getContainer().resolve(CorePulumi);
                pulumiHandlers.execute(app);
            };

            const usingAdvancedVpcParams = vpc && typeof vpc !== "boolean";

            const license = await License.fromEnvironment();
            if (license.canUseFileManagerThreatDetection()) {
                configureS3BucketMalwareProtection(app);
            }

            // Not using advanced VPC params? Then immediately exit.
            if (!usingAdvancedVpcParams) {
                return defaultPulumi();
            }

            const { resources, addResource, onResource } = app;
            const { useExistingVpc, useVpcEndpoints } = vpc;

            // 1. We first deal with "existing VPC" setup.
            if (useExistingVpc) {
                if ("useVpcEndpoints" in vpc) {
                    throw new Error(
                        "Cannot specify `useVpcEndpoints` parameter when using an existing VPC. The VPC endpoints configurations should be already defined within the existing VPC."
                    );
                }

                if (elasticSearch) {
                    if (!useExistingVpc.elasticSearchDomainVpcConfig) {
                        throw new Error(
                            "Cannot specify `useExistingVpc` parameter because the `elasticSearchDomainVpcConfig` parameter wasn't provided."
                        );
                    }

                    onResource(resource => {
                        if (isResourceOfType(resource, aws.elasticsearch.Domain)) {
                            resource.config.vpcOptions(
                                useExistingVpc!.elasticSearchDomainVpcConfig
                            );
                        }
                    });
                }

                if (openSearch) {
                    if (!useExistingVpc.openSearchDomainVpcConfig) {
                        throw new Error(
                            "Cannot specify `useExistingVpc` parameter because the `openSearchDomainVpcConfig` parameter wasn't provided."
                        );
                    }

                    onResource(resource => {
                        if (isResourceOfType(resource, aws.opensearch.Domain)) {
                            resource.config.vpcOptions(useExistingVpc!.openSearchDomainVpcConfig);
                        }
                    });
                }

                if (!useExistingVpc.lambdaFunctionsVpcConfig) {
                    throw new Error(
                        "Cannot specify `useExistingVpc` parameter because the `lambdaFunctionsVpcConfig` parameter wasn't provided."
                    );
                }

                onResource(resource => {
                    if (isResourceOfType(resource, aws.lambda.Function)) {
                        const canUseVpc = resource.meta.canUseVpc !== false;
                        if (canUseVpc) {
                            resource.config.vpcConfig(useExistingVpc!.lambdaFunctionsVpcConfig);
                        }
                    }

                    if (isResourceOfType(resource, aws.iam.Role)) {
                        if (resource.meta.isLambdaFunctionRole) {
                            addResource(aws.iam.RolePolicyAttachment, {
                                name: `${resource.name}-vpc-access-execution-role`,
                                config: {
                                    role: resource.output.name,
                                    policyArn: aws.iam.ManagedPolicy.AWSLambdaVPCAccessExecutionRole
                                }
                            });
                        }
                    }
                });

                return defaultPulumi();
            }

            // 2. Now we deal with "non-existing VPC" setup.
            if (useVpcEndpoints) {
                const region = getAwsRegion(app);

                onResource(resource => {
                    if (isResourceOfType(resource, aws.ec2.Vpc)) {
                        resource.config.enableDnsSupport(true);
                        resource.config.enableDnsHostnames(true);
                    }
                });

                const { vpc, subnets, routeTables } = resources.vpc!;
                addResource(aws.ec2.VpcEndpoint, {
                    name: "vpc-s3-vpc-endpoint",
                    config: {
                        vpcId: vpc.output.id,
                        serviceName: pulumi.interpolate`com.amazonaws.${region}.s3`,
                        routeTableIds: [routeTables.privateSubnets.output.id]
                    }
                });

                addResource(aws.ec2.VpcEndpoint, {
                    name: "vpc-dynamodb-vpc-endpoint",
                    config: {
                        vpcId: vpc.output.id,
                        serviceName: pulumi.interpolate`com.amazonaws.${region}.dynamodb`,
                        routeTableIds: [routeTables.privateSubnets.output.id]
                    }
                });

                addResource(aws.ec2.VpcEndpoint, {
                    name: "vpc-sqs-vpc-endpoint",
                    config: {
                        vpcId: vpc.output.id,
                        serviceName: pulumi.interpolate`com.amazonaws.${region}.sqs`,
                        vpcEndpointType: "Interface",
                        privateDnsEnabled: true,
                        securityGroupIds: [vpc.output.defaultSecurityGroupId],
                        subnetIds: subnets.private.map(subNet => subNet.output.id)
                    }
                });

                addResource(aws.ec2.VpcEndpoint, {
                    name: "vpc-events-vpc-endpoint",
                    config: {
                        vpcId: vpc.output.id,
                        serviceName: pulumi.interpolate`com.amazonaws.${region}.events`,
                        vpcEndpointType: "Interface",
                        privateDnsEnabled: true,
                        securityGroupIds: [vpc.output.defaultSecurityGroupId],
                        subnetIds: subnets.private.map(subNet => subNet.output.id)
                    }
                });
            }

            return defaultPulumi();
        }
    });
}
