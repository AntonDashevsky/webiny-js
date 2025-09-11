import type { IManager } from "~/types.js";
import type { PrimitiveValue } from "@webiny/api-elasticsearch/types.js";
import type { IIndexManager } from "~/settings/types.js";
import type {
    ITaskResponseAbortedResult,
    ITaskResponseContinueResult,
    ITaskResponseDoneResult,
    ITaskResponseDoneResultOutput,
    ITaskResponseErrorResult
} from "@webiny/tasks";
import type { IElasticsearchSynchronize } from "~/tasks/dataSynchronization/elasticsearch/abstractions/ElasticsearchSynchronize.js";
import type { IElasticsearchFetcher } from "~/tasks/dataSynchronization/elasticsearch/abstractions/ElasticsearchFetcher.js";

export interface IDataSynchronizationInputValue {
    finished?: boolean;
}

export interface IDataSynchronizationInputElasticsearchToDynamoDbValue
    extends IDataSynchronizationInputValue {
    index?: string;
    cursor?: PrimitiveValue[];
}

export interface IDataSynchronizationInput {
    flow: "elasticsearchToDynamoDb";
    elasticsearchToDynamoDb?: IDataSynchronizationInputElasticsearchToDynamoDbValue;
}

export type IDataSynchronizationOutput = ITaskResponseDoneResultOutput;

export type ISynchronizationRunResult =
    | ITaskResponseContinueResult<IDataSynchronizationInput>
    | ITaskResponseDoneResult<IDataSynchronizationOutput>
    | ITaskResponseErrorResult
    | ITaskResponseAbortedResult;

export interface ISynchronization {
    run(input: IDataSynchronizationInput): Promise<ISynchronizationRunResult>;
}

export interface IElasticsearchSyncParams {
    manager: IDataSynchronizationManager;
    indexManager: IIndexManager;
    synchronize: IElasticsearchSynchronize;
    fetcher: IElasticsearchFetcher;
}

export interface IElasticsearchSyncFactory {
    (params: IElasticsearchSyncParams): ISynchronization;
}

export interface IFactories {
    /**
     * Delete all the records which are in the Elasticsearch but not in the Elasticsearch DynamoDB table.
     */
    elasticsearchToDynamoDb: IElasticsearchSyncFactory;
}

export type IDataSynchronizationManager = IManager<
    IDataSynchronizationInput,
    IDataSynchronizationOutput
>;
