import * as aws from "@pulumi/aws";
import type { CreateSyncSystemPulumiAppParams as BaseCreateSyncSystemPulumiAppParams } from "~/apps/syncSystem/createSyncSystemPulumiApp.js";
import { createSyncSystemPulumiApp as baseCreateSyncSystemPulumiApp } from "~/apps/syncSystem/createSyncSystemPulumiApp.js";
import type { PulumiAppParam } from "@webiny/pulumi";
import { isResourceOfType } from "@webiny/pulumi";
import { getVpcConfigFromExtension } from "~/enterprise/extensions/getVpcConfigFromExtension";
import { awsTags as awsTagsExt } from "~/extensions/awsTags";
import { tagResources } from "~/utils";
import { WebsitePulumi } from "@webiny/project/abstractions";

export type SyncSystemPulumiApp = ReturnType<typeof createSyncSystemPulumiApp>;

export type SyncSystemPulumiAppAdvancedVpcParams = Partial<{
    useVpcEndpoints: boolean;
    useExistingVpc: {
        elasticSearchDomainVpcConfig?: aws.types.input.elasticsearch.DomainVpcOptions;
        openSearchDomainVpcConfig?: aws.types.input.opensearch.DomainVpcOptions;
        lambdaFunctionsVpcConfig: aws.types.input.lambda.FunctionVpcConfig;
    };
}>;

export interface CreateSyncSystemPulumiAppParams
    extends Omit<BaseCreateSyncSystemPulumiAppParams, "vpc"> {
    vpc?: PulumiAppParam<boolean | SyncSystemPulumiAppAdvancedVpcParams>;
}

export function createSyncSystemPulumiApp(projectAppParams: CreateSyncSystemPulumiAppParams = {}) {
    const vpc = getVpcConfigFromExtension(projectConfig);

    return baseCreateSyncSystemPulumiApp({
        ...projectAppParams,
        // If using existing VPC, we ensure `vpc` param is set to `false`.
        vpc: ({ getParam }) => {
            const usingAdvancedVpcParams = vpc && typeof vpc !== "boolean";
            return usingAdvancedVpcParams && vpc.useExistingVpc ? false : Boolean(vpc);
        },
        pulumi(app) {
            const defaultPulumi = () => {
                projectConfig.extensionsByType(awsTagsExt).forEach(ext => {
                    tagResources(ext.params.tags);
                });

                const pulumiHandlers = sdk.getContainer().resolve(WebsitePulumi);
                pulumiHandlers.execute(app);
            };

            const { getParam } = app;
            const usingAdvancedVpcParams = vpc && typeof vpc !== "boolean";

            // Not using advanced VPC params? Then immediately exit.
            if (!usingAdvancedVpcParams) {
                return defaultPulumi();
            }

            const { onResource, addResource } = app;
            const { useExistingVpc } = vpc;

            // 1. We first deal with "existing VPC" setup.
            if (useExistingVpc) {
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
            }

            return defaultPulumi();
        }
    });
}
