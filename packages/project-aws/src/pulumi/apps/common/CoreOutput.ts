import { createAppModule, type PulumiAppModule } from "@webiny/pulumi";
import { getStackOutput } from "@webiny/project";

export type CoreOutput = PulumiAppModule<typeof CoreOutput>;

export interface ICoreOutput {
    deploymentId: string;
    region: string;
    dynamoDbTable: string;
    iotAuthorizerName: string;
    cognitoUserPoolArn: string;
    cognitoAppClientId: string;
    cognitoUserPoolId: string;
    cognitoUserPoolPasswordPolicy: string;
    fileManagerBucketId: string;
    fileManagerBucketArn: string;
    primaryDynamodbTableArn: string;
    primaryDynamodbTableName: string;
    primaryDynamodbTableHashKey: string;
    primaryDynamodbTableRangeKey: string;
    logDynamodbTableArn: string;
    logDynamodbTableName: string;
    logDynamodbTableHashKey: string;
    logDynamodbTableRangeKey: string;
    eventBusName: string;
    eventBusArn: string;
    vpcPublicSubnetIds: string[] | undefined;
    vpcPrivateSubnetIds: string[] | undefined;
    vpcSecurityGroupIds: string[] | undefined;
    elasticsearchDomainArn: string | undefined;
    elasticsearchDomainEndpoint: string | undefined;
    elasticsearchDynamodbTableHashKey: string;
    elasticsearchDynamodbTableRangeKey: string;
    elasticsearchDynamodbTableArn: string | undefined;
    elasticsearchDynamodbTableName: string | undefined;
}

export const CoreOutput = createAppModule({
    name: "CoreOutput",
    config(app) {
        return app.addHandler(async () => {
            const output = await getStackOutput({
                app: "core",
                env: app.params.run.env,
                variant: app.params.run.variant
            });

            if (!output) {
                throw new Error("Core application is not deployed.");
            }

            return {
                fileManagerBucketId: output["fileManagerBucketId"],
                primaryDynamodbTableArn: output["primaryDynamodbTableArn"],
                primaryDynamodbTableName: output["primaryDynamodbTableName"],
                primaryDynamodbTableHashKey: output["primaryDynamodbTableHashKey"],
                primaryDynamodbTableRangeKey: output["primaryDynamodbTableRangeKey"],
                logDynamodbTableArn: output["logDynamodbTableArn"],
                logDynamodbTableName: output["logDynamodbTableName"],
                logDynamodbTableHashKey: output["logDynamodbTableHashKey"],
                logDynamodbTableRangeKey: output["logDynamodbTableRangeKey"],
                cognitoUserPoolId: output["cognitoUserPoolId"],
                cognitoUserPoolArn: output["cognitoUserPoolArn"],
                cognitoUserPoolPasswordPolicy: output["cognitoUserPoolPasswordPolicy"],
                cognitoAppClientId: output["cognitoAppClientId"],
                eventBusName: output["eventBusName"],
                eventBusArn: output["eventBusArn"],
                // These outputs are optional, since VPC is not always enabled.
                vpcPublicSubnetIds: output["vpcPublicSubnetIds"],
                vpcPrivateSubnetIds: output["vpcPrivateSubnetIds"],
                vpcSecurityGroupIds: output["vpcSecurityGroupIds"],
                // These outputs are optional, since Elasticsearch is not always enabled.
                elasticsearchDomainArn: output["elasticsearchDomainArn"],
                elasticsearchDomainEndpoint: output["elasticsearchDomainEndpoint"],
                elasticsearchDynamodbTableArn: output["elasticsearchDynamodbTableArn"],
                elasticsearchDynamodbTableName: output["elasticsearchDynamodbTableName"]
            } as ICoreOutput;
        });
    }
});
