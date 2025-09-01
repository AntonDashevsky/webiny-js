import * as aws from "@pulumi/aws";
import {
    createWebsitePulumiApp as baseCreateWebsitePulumiApp,
    type CreateWebsitePulumiAppParams as BaseCreateWebsitePulumiAppParams
} from "~/apps/website/createWebsitePulumiApp.js";
import { isResourceOfType, type PulumiAppParam } from "@webiny/pulumi";
import { getVpcConfigFromExtension } from "./extensions/getVpcConfigFromExtension";
import { getProjectSdk } from "@webiny/project";
import { awsTags as awsTagsExt } from "~/extensions/awsTags";
import { tagResources } from "~/utils";
import { WebsitePulumi } from "@webiny/project/abstractions";

export type WebsitePulumiApp = ReturnType<typeof createWebsitePulumiApp>;

export type WebsitePulumiAppAdvancedVpcParams = Partial<{
    useExistingVpc: {
        lambdaFunctionsVpcConfig: aws.types.input.lambda.FunctionVpcConfig;
    };
}>;

export interface CreateWebsitePulumiAppParams
    extends Omit<BaseCreateWebsitePulumiAppParams, "vpc"> {
    vpc?: PulumiAppParam<boolean | WebsitePulumiAppAdvancedVpcParams>;
}

const sdk = await getProjectSdk();
const projectConfig = await sdk.getProjectConfig();

export function createWebsitePulumiApp(projectAppParams: CreateWebsitePulumiAppParams = {}) {
    const vpc = getVpcConfigFromExtension(projectConfig);

    return baseCreateWebsitePulumiApp({
        ...projectAppParams,
        // If using existing VPC, we ensure `vpc` param is set to `false`.
        vpc: ({ getParam }) => {
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
