import * as aws from "@pulumi/aws";
import { isResourceOfType, type PulumiAppParam } from "@webiny/pulumi";
import { License } from "@webiny/wcp";
import {
    createApiPulumiApp as baseCreateApiPulumiApp,
    type CreateApiPulumiAppParams as BaseCreateApiPulumiAppParams
} from "~/apps/api/createApiPulumiApp.js";
import { handleGuardDutyEvents } from "~/enterprise/api/handleGuardDutyEvents.js";
import { getVpcConfigFromExtension } from "./extensions/getVpcConfigFromExtension";
import { getEsConfigFromExtension } from "./extensions/getEsConfigFromExtension";
import { getOsConfigFromExtension } from "./extensions/getOsConfigFromExtension";
import { getProjectSdk } from "@webiny/project";
import { awsTags as awsTagsExt } from "~/extensions/awsTags";
import { tagResources } from "~/utils";
import { ApiPulumi } from "@webiny/project/abstractions";

export type ApiPulumiAppAdvancedVpcParams = Partial<{
    useExistingVpc: {
        lambdaFunctionsVpcConfig: aws.types.input.lambda.FunctionVpcConfig;
    };
}>;

const sdk = await getProjectSdk();
const projectConfig = await sdk.getProjectConfig();

export function createApiPulumiApp() {
    const vpc = getVpcConfigFromExtension(projectConfig);
    const elasticSearch = getEsConfigFromExtension(projectConfig);
    const openSearch = getOsConfigFromExtension(projectConfig);

    return baseCreateApiPulumiApp({
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

                const pulumiHandlers = sdk.getContainer().resolve(ApiPulumi);
                pulumiHandlers.execute(app);
            };

            const license = await License.fromEnvironment();

            const { getParam } = app;
            const usingAdvancedVpcParams = vpc && typeof vpc !== "boolean";

            if (license.canUseFileManagerThreatDetection()) {
                handleGuardDutyEvents(app);
            }

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
