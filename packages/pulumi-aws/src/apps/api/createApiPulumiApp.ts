import * as aws from "@pulumi/aws";
import { createPulumiApp, isResourceOfType } from "@webiny/pulumi";
import {
    ApiApwScheduler,
    ApiBackgroundTask,
    ApiCloudfront,
    ApiFileManager,
    ApiGateway,
    ApiGraphql,
    ApiMigration,
    ApiPageBuilder,
    ApiWebsocket,
    CoreOutput,
    CorePulumiApp,
    VpcConfig
} from "~/apps/index.js";
import {
    addDomainsUrlsOutputs,
    withCommonLambdaEnvVariables,
    withServiceManifest
} from "~/utils/index.js";
import { getEnvVariableAwsRegion } from "~/env/awsRegion.js";
import { getProjectSdk } from "@webiny/project";
import { getVpcConfigFromExtension } from "~/apps/extensions/getVpcConfigFromExtension";
import { getOsConfigFromExtension } from "~/apps/extensions/getOsConfigFromExtension";
import { getEsConfigFromExtension } from "~/apps/extensions/getEsConfigFromExtension";
import { ApiPulumi } from "@webiny/project/abstractions";
import { applyAwsResourceTags } from "~/apps/awsUtils";
import { License } from "@webiny/wcp";
import { handleGuardDutyEvents } from "./handleGuardDutyEvents";

export type ApiPulumiApp = ReturnType<typeof createApiPulumiApp>;

export const createApiPulumiApp = () => {
    const baseApp = createPulumiApp({
        name: "api",
        path: "apps/api",
        program: async app => {
            const sdk = await getProjectSdk();
            const projectConfig = await sdk.getProjectConfig();

            const pulumiResourceNamePrefix = await sdk.getPulumiResourceNamePrefix();
            const vpcExtensionsConfig = getVpcConfigFromExtension(projectConfig);
            const openSearchExtensionConfig = getOsConfigFromExtension(projectConfig);
            const elasticSearchExtensionConfig = getEsConfigFromExtension(projectConfig);

            let searchEngineParams:
                | typeof openSearchExtensionConfig
                | typeof elasticSearchExtensionConfig
                | null = null;

            if (openSearchExtensionConfig) {
                searchEngineParams = openSearchExtensionConfig;
            } else if (elasticSearchExtensionConfig) {
                searchEngineParams = elasticSearchExtensionConfig;
            }

            if (searchEngineParams) {
                const params = searchEngineParams;
                if (typeof params === "object") {
                    if (params.domainName) {
                        process.env.AWS_ELASTIC_SEARCH_DOMAIN_NAME = params.domainName;
                    }

                    if (params.indexPrefix) {
                        process.env.ELASTIC_SEARCH_INDEX_PREFIX = params.indexPrefix;
                    }

                    if (params.sharedIndexes) {
                        process.env.ELASTICSEARCH_SHARED_INDEXES = "true";
                    }
                }
            }

            if (pulumiResourceNamePrefix) {
                app.onResource(resource => {
                    if (!resource.name.startsWith(pulumiResourceNamePrefix)) {
                        resource.name = `${pulumiResourceNamePrefix}${resource.name}`;
                    }
                });
            }

            // <-------------------- Enterprise start -------------------->
            app.addHandler(async () => {
                const license = await License.fromEnvironment();

                const usingAdvancedVpcParams =
                    vpcExtensionsConfig && typeof vpcExtensionsConfig !== "boolean";

                if (license.canUseFileManagerThreatDetection()) {
                    handleGuardDutyEvents(app as ApiPulumiApp);
                }

                // Not using advanced VPC params? Then immediately exit.
                if (usingAdvancedVpcParams) {
                    const { onResource, addResource } = app;
                    const { useExistingVpc } = vpcExtensionsConfig;

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
                                    resource.config.vpcConfig(
                                        useExistingVpc!.lambdaFunctionsVpcConfig
                                    );
                                }
                            }

                            if (isResourceOfType(resource, aws.iam.Role)) {
                                if (resource.meta.isLambdaFunctionRole) {
                                    addResource(aws.iam.RolePolicyAttachment, {
                                        name: `${resource.name}-vpc-access-execution-role`,
                                        config: {
                                            role: resource.output.name,
                                            policyArn:
                                                aws.iam.ManagedPolicy
                                                    .AWSLambdaVPCAccessExecutionRole
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
            // <-------------------- Enterprise end -------------------->

            // Overrides must be applied via a handler, registered at the very start of the program.
            // By doing this, we're ensuring user's adjustments are not applied to late.
            const pulumiHandlers = sdk.getContainer().resolve(ApiPulumi);

            app.addHandler(() => {
                return pulumiHandlers.execute(app as unknown as CorePulumiApp);
            });

            const isProduction = app.env.isProduction;

            // Register core output as a module available to all the other modules
            const core = app.addModule(CoreOutput);

            // Register VPC config module to be available to other modules.
            const vpcEnabled = !!vpcExtensionsConfig ?? isProduction;

            app.addModule(VpcConfig, { enabled: vpcEnabled });

            const pageBuilder = app.addModule(ApiPageBuilder, {
                env: {
                    COGNITO_REGION: getEnvVariableAwsRegion(),
                    COGNITO_USER_POOL_ID: core.cognitoUserPoolId,
                    DB_TABLE: core.primaryDynamodbTableName,
                    DB_TABLE_LOG: core.logDynamodbTableName,
                    DB_TABLE_ELASTICSEARCH: core.elasticsearchDynamodbTableName,
                    ELASTIC_SEARCH_ENDPOINT: core.elasticsearchDomainEndpoint,

                    // Not required. Useful for testing purposes / ephemeral environments.
                    // https://www.webiny.com/docs/key-topics/ci-cd/testing/slow-ephemeral-environments
                    ELASTIC_SEARCH_INDEX_PREFIX: process.env.ELASTIC_SEARCH_INDEX_PREFIX,
                    ELASTICSEARCH_SHARED_INDEXES: process.env.ELASTICSEARCH_SHARED_INDEXES,

                    S3_BUCKET: core.fileManagerBucketId
                }
            });

            const apwScheduler = app.addModule(ApiApwScheduler, {
                primaryDynamodbTableArn: core.primaryDynamodbTableArn,

                env: {
                    COGNITO_REGION: getEnvVariableAwsRegion(),
                    COGNITO_USER_POOL_ID: core.cognitoUserPoolId,
                    DB_TABLE: core.primaryDynamodbTableName,
                    DB_TABLE_LOG: core.logDynamodbTableName,
                    S3_BUCKET: core.fileManagerBucketId
                }
            });

            const graphql = app.addModule(ApiGraphql, {
                env: {
                    COGNITO_REGION: getEnvVariableAwsRegion(),
                    COGNITO_USER_POOL_ID: core.cognitoUserPoolId,
                    DB_TABLE: core.primaryDynamodbTableName,
                    DB_TABLE_LOG: core.logDynamodbTableName,
                    DB_TABLE_ELASTICSEARCH: core.elasticsearchDynamodbTableName,
                    ELASTIC_SEARCH_ENDPOINT: core.elasticsearchDomainEndpoint,

                    // Not required. Useful for testing purposes / ephemeral environments.
                    // https://www.webiny.com/docs/key-topics/ci-cd/testing/slow-ephemeral-environments
                    ELASTIC_SEARCH_INDEX_PREFIX: process.env.ELASTIC_SEARCH_INDEX_PREFIX,
                    ELASTICSEARCH_SHARED_INDEXES: process.env.ELASTICSEARCH_SHARED_INDEXES,

                    S3_BUCKET: core.fileManagerBucketId,
                    EVENT_BUS: core.eventBusArn,
                    IMPORT_CREATE_HANDLER: pageBuilder.import.functions.create.output.arn,
                    EXPORT_PROCESS_HANDLER: pageBuilder.export.functions.process.output.arn,
                    // TODO: move to okta plugin
                    OKTA_ISSUER: process.env["OKTA_ISSUER"],
                    APW_SCHEDULER_SCHEDULE_ACTION_HANDLER:
                        apwScheduler.scheduleAction.lambda.output.arn
                },
                apwSchedulerEventRule: apwScheduler.eventRule.output,
                apwSchedulerEventTarget: apwScheduler.eventTarget.output
            });

            const websocket = app.addModule(ApiWebsocket);

            const fileManager = app.addModule(ApiFileManager, {
                env: {
                    DB_TABLE: core.primaryDynamodbTableName,
                    DB_TABLE_LOG: core.logDynamodbTableName
                }
            });

            const apiGateway = app.addModule(ApiGateway, {
                "graphql-post": {
                    path: "/graphql",
                    method: "POST",
                    function: graphql.functions.graphql.output.arn
                },
                "graphql-options": {
                    path: "/graphql",
                    method: "OPTIONS",
                    function: graphql.functions.graphql.output.arn
                },
                "files-any": {
                    path: "/files/{path+}",
                    method: "ANY",
                    function: fileManager.functions.download.output.arn
                },
                "private-any": {
                    path: "/private/{path+}",
                    method: "ANY",
                    function: fileManager.functions.download.output.arn
                },
                "cms-post": {
                    path: "/cms/{key+}",
                    method: "POST",
                    function: graphql.functions.graphql.output.arn
                },
                "cms-options": {
                    path: "/cms/{key+}",
                    method: "OPTIONS",
                    function: graphql.functions.graphql.output.arn
                },
                "files-catch-all": {
                    path: "/{path+}",
                    method: "ANY",
                    function: fileManager.functions.download.output.arn
                }
            });

            const cloudfront = app.addModule(ApiCloudfront);
            const backgroundTask = app.addModule(ApiBackgroundTask);
            const migration = app.addModule(ApiMigration);

            // const domains = app.getParam(projectAppParams.domains);
            // if (domains) {
            //     applyCustomDomain(cloudfront, domains);
            // }

            app.addOutputs({
                region: aws.config.region,
                cognitoUserPoolId: core.cognitoUserPoolId,
                cognitoAppClientId: core.cognitoAppClientId,
                cognitoUserPoolPasswordPolicy: core.cognitoUserPoolPasswordPolicy,
                apwSchedulerScheduleAction: apwScheduler.scheduleAction.lambda.output.arn,
                apwSchedulerExecuteAction: apwScheduler.executeAction.lambda.output.arn,
                apwSchedulerEventRule: apwScheduler.eventRule.output.name,
                apwSchedulerEventTargetId: apwScheduler.eventTarget.output.targetId,
                dynamoDbTable: core.primaryDynamodbTableName,
                migrationLambdaArn: migration.function.output.arn,
                graphqlLambdaName: graphql.functions.graphql.output.name,
                graphqlLambdaRole: graphql.role.output.arn,
                backgroundTaskLambdaArn: backgroundTask.backgroundTask.output.arn,
                backgroundTaskStepFunctionArn: backgroundTask.stepFunction.output.arn,
                websocketApiId: websocket.websocketApi.output.id,
                websocketApiUrl: websocket.websocketApiUrl
            });

            // Only add `dynamoDbElasticsearchTable` output if using search engine (ES/OS).
            if (searchEngineParams) {
                app.addOutputs({
                    dynamoDbElasticsearchTable: core.elasticsearchDynamodbTableName
                });
            }

            app.addHandler(() => {
                addDomainsUrlsOutputs({
                    app,
                    cloudfrontDistribution: cloudfront,
                    map: {
                        distributionDomain: "cloudfrontApiDomain",
                        distributionUrl: "cloudfrontApiUrl",
                        usedDomain: "apiDomain",
                        usedUrl: "apiUrl"
                    }
                });
            });

            // Applies internal and user-defined AWS tags.
            await applyAwsResourceTags("api");

            return {
                fileManager,
                graphql,
                apiGateway,
                websocket,
                cloudfront,
                apwScheduler,
                migration,
                backgroundTask
            };
        }
    });

    const app = withServiceManifest(withCommonLambdaEnvVariables(baseApp));

    app.addHandler(() => {
        app.addServiceManifest({
            name: "api",
            manifest: {
                bgTaskSfn: baseApp.resources.backgroundTask.stepFunction.output.arn,
                cloudfront: {
                    distributionId: baseApp.resources.cloudfront.output.id
                }
            }
        });
    });

    return app;
};
