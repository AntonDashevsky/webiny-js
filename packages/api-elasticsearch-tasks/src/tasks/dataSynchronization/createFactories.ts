import type { IFactories } from "./types.js";
import { ElasticsearchToDynamoDbSynchronization } from "./elasticsearch/ElasticsearchToDynamoDbSynchronization.js";

export const createFactories = (): IFactories => {
    return {
        elasticsearchToDynamoDb: params => {
            return new ElasticsearchToDynamoDbSynchronization(params);
        }
    };
};
