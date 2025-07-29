import type { DynamoDBTableType } from "~/types";
import type { SemVer } from "semver";
import type { ITable } from "~/sync/types";

export interface IDeploymentServices {
    s3Id: string;
    s3Arn: string;
    primaryDynamoDbArn: string;
    primaryDynamoDbName: string;
    primaryDynamoDbHashKey: string;
    primaryDynamoDbRangeKey: string;
    elasticsearchDynamodbTableArn?: string;
    elasticsearchDynamodbTableName?: string;
    logDynamodbTableArn: string;
    logDynamodbTableName: string;
    cognitoUserPoolId: string;
}

export interface IDeployment<S = IDeploymentServices> {
    name: string;
    env: string;
    variant: string | undefined;
    region: string;
    services: S;
    version: SemVer;
    getTable(type: DynamoDBTableType): ITable;
}

export interface IDeployments {
    hasAny(): boolean;
    all(): IDeployment[];
    get(name: string): IDeployment | null;
    without(deployment: Pick<IDeployment, "name">): IDeployments;
}

export interface IDeploymentsFetcher {
    fetch(): Promise<IDeployments>;
}
