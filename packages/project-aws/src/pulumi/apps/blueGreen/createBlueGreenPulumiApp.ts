import * as aws from "@pulumi/aws";
import { Region } from "@pulumi/aws";
import { createPulumiApp } from "@webiny/pulumi";
import { BlueGreenRouterCloudFront } from "./BlueGreenRouterCloudFront.js";
import { createCloudFrontDefaultCacheBehaviorPolicies } from "./cloudfront/createCloudFrontDefaultCacheBehaviorPolicies.js";
import { BlueGreenRouterApiGateway } from "./BlueGreenRouterApiGateway.js";
import { BlueGreenRouterCloudFrontStore } from "./BlueGreenRouterCloudFrontStore.js";
import type { IAttachDomainsCallable, IBlueGreenDeployment } from "./types.js";
import { validateDeployments } from "./validation/validateDeployments.js";
import { getApplicationDomains } from "./domains/getApplicationDomains.js";
import { convertApplicationDomains } from "./domains/convertApplicationDomains.js";
import { resolveDomains } from "./domains/resolveDomains.js";
import { applyCustomDomain } from "~/pulumi/apps/customDomain.js";
import { attachDomainsToOutput } from "~/pulumi/apps/blueGreen/domains/attachDomainsToOutput.js";
import { BLUE_GREEN_ROUTER_STORE_KEY } from "./constants.js";
import { getProjectSdk } from "@webiny/project";
import { getVpcConfigFromExtension } from "~/pulumi/apps/extensions/getVpcConfigFromExtension.js";
import { getOsConfigFromExtension } from "~/pulumi/apps/extensions/getOsConfigFromExtension.js";
import { getEsConfigFromExtension } from "~/pulumi/apps/extensions/getEsConfigFromExtension.js";
import { applyAwsResourceTags } from "~/pulumi/apps/awsUtils.js";

export type BlueGreenRouterPulumiApp = ReturnType<typeof createBlueGreenPulumiApp>;

export interface IDeploymentsCallableParams {
    env: string;
}

export interface IDeploymentsCallable {
    (params: IDeploymentsCallableParams): [IBlueGreenDeployment, IBlueGreenDeployment];
}

export interface CreateBlueGreenPulumiAppParams {
    /**
     * Available deployments for the Blue / Green switch.
     * They will be validated before deploy.
     */
    deployments: IDeploymentsCallable;
    /**
     * Attach domains to the Blue/Green CloudFront.
     */
    domains: IAttachDomainsCallable;
}

export function createBlueGreenPulumiApp(projectAppParams: CreateBlueGreenPulumiAppParams) {
    return createPulumiApp({
        name: "blueGreen",
        path: "apps/blueGreen",
        config: projectAppParams,
        program: async app => {
            const sdk = await getProjectSdk();
            const pulumiResourceNamePrefix = await sdk.getPulumiResourceNamePrefix();

            const deployments = validateDeployments(projectAppParams.deployments(app.params.run));

            const applicationsDomains = await getApplicationDomains({
                stacks: deployments
            });

            if (pulumiResourceNamePrefix) {
                app.onResource(resource => {
                    if (!resource.name.startsWith(pulumiResourceNamePrefix)) {
                        resource.name = `${pulumiResourceNamePrefix}${resource.name}`;
                    }
                });
            }

            const deploymentsDomains = convertApplicationDomains({
                input: applicationsDomains
            });

            const attachedDomains = projectAppParams.domains(app.params.run);

            const domains = resolveDomains({
                attachedDomains,
                deploymentsDomains
            });
            const protect = app.env.isProduction;

            const region = new aws.Provider(Region.USEast1, {
                region: Region.USEast1
            });

            /**
             * Policies required for default Cache Behavior in CloudFront.
             * We need to do this outside the module creation because it is async.
             */
            const { forwardEverythingOriginRequestPolicyId, disableCachingCachePolicyId } =
                await createCloudFrontDefaultCacheBehaviorPolicies();
            const store = app.addModule(BlueGreenRouterCloudFrontStore, {
                protect,
                region
            });
            /**
             * TODO Maybe have switching via deployment instead of changing the key?
             * Key takes up to few minutes to propagate.
             * Deployment takes 10 seconds + 30-60 seconds for the CloudFront to propagate.
             */
            app.addResource(aws.cloudfront.KeyvaluestoreKey, {
                name: "blue-green-router-store-key",
                config: {
                    keyValueStoreArn: store.cloudFrontStore.output.arn,
                    key: BLUE_GREEN_ROUTER_STORE_KEY,
                    value: "green"
                }
            });

            const apiGateway = app.addModule(BlueGreenRouterApiGateway, {
                protect,
                region
            });

            const cloudfront = app.addModule(BlueGreenRouterCloudFront, {
                protect,
                region,
                domains,
                cachePolicyId: disableCachingCachePolicyId,
                originRequestPolicyId: forwardEverythingOriginRequestPolicyId
            });

            const domainNames = domains.reduce<string[]>((collection, domain) => {
                for (const source of domain.sources) {
                    if (collection.includes(source)) {
                        continue;
                    }
                    collection.push(source);
                }
                return collection;
            }, []);

            applyCustomDomain(cloudfront.cloudFront, {
                domains: domainNames,
                sslSupportMethod: attachedDomains.sslSupportMethod,
                acmCertificateArn: attachedDomains.acmCertificateArn
            });

            attachDomainsToOutput({
                app,
                domains,
                cloudFront: cloudfront.cloudFront
            });

            // Applies internal and user-defined AWS tags.
            await applyAwsResourceTags("blueGreen");

            return {
                region,
                cloudfront,
                apiGateway,
                store
            };
        }
    });
}
