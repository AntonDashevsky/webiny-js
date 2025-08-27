import { z } from "zod";
import { defineExtension } from "@webiny/project/extensions/defineExtension/index.js";

export const vpcSettings = defineExtension({
    type: "Deployments/VpcSettings",
    tags: { runtimeContext: "project" },
    description: "Apply VPC settings to AWS resources during deployment.",
    multiple: true,
    paramsSchema: z.object({
        useVpcEndpoints: z
            .boolean()
            .default(false)
            .describe("Whether to use VPC endpoints for AWS services."),
        useExistingVpc: z
            .object({
                elasticSearchDomainVpcConfig: z
                    .object({
                        securityGroupIds: z
                            .array(z.string())
                            .describe("The security group IDs for the Elasticsearch domain."),
                        subnetIds: z
                            .array(z.string())
                            .describe("The subnet IDs for the Elasticsearch domain.")
                    })
                    .optional()
                    .describe("VPC configuration for an existing Elasticsearch domain."),
                openSearchDomainVpcConfig: z
                    .object({
                        securityGroupIds: z
                            .array(z.string())
                            .describe("The security group IDs for the OpenSearch domain."),
                        subnetIds: z
                            .array(z.string())
                            .describe("The subnet IDs for the OpenSearch domain.")
                    })
                    .optional()
                    .describe("VPC configuration for an existing OpenSearch domain."),
                lambdaFunctionsVpcConfig: z
                    .object({
                        securityGroupIds: z
                            .array(z.string())
                            .describe("The security group IDs for the Lambda functions."),
                        subnetIds: z
                            .array(z.string())
                            .describe("The subnet IDs for the Lambda functions.")
                    })
                    .describe("VPC configuration for Lambda functions.")
            })
            .describe("Configuration for using an existing VPC.")
    })
});
