import { IStackOutput } from "@webiny/project";

// TODO: split into this per-app stack outputs.
export interface IDefaultStackOutput extends IStackOutput {
    deploymentId: string;
    region: string;
    dynamoDbTable: string;
    migrationLambdaArn: string;
    iotAuthorizerName: string;
    apiDomain: string;
    apiUrl: string;
    graphqlLambdaRole: string;
    graphqlLambdaRoleName: string;
    fileManagerManageLambdaArn: string;
    fileManagerManageLambdaRole: string;
    fileManagerManageLambdaRoleName: string;
    cognitoUserPoolArn: string;
    cognitoAppClientId: string;
    cognitoUserPoolId: string;
    cognitoUserPoolPasswordPolicy: string;
    websocketApiUrl: string;
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
    appStorage: string;
    appDomain?: string;
    deliveryDomain?: string;
}
