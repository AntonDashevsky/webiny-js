import { createTaskDefinition } from "@webiny/tasks";
import type { Context, IElasticsearchTaskConfig } from "~/types.js";
import type { IElasticsearchEnableIndexingTaskInput } from "./types.js";

export const createEnableIndexingTask = (params?: IElasticsearchTaskConfig) => {
    return createTaskDefinition<Context, IElasticsearchEnableIndexingTaskInput>({
        id: "elasticsearchEnableIndexing",
        title: "Enable Indexing on Elasticsearch Indexes",
        run: async ({ response, context, isAborted, isCloseToTimeout, input, store, timer }) => {
            const { Manager } = await import(
                /* webpackChunkName: "Manager" */
                "../Manager.js"
            );
            const { IndexManager } = await import(
                /* webpackChunkName: "IndexManager" */ "~/settings/index.js"
            );

            const { EnableIndexingTaskRunner } = await import(
                /* webpackChunkName: "EnableIndexingTaskRunner" */ "./EnableIndexingTaskRunner.js"
            );

            const manager = new Manager<IElasticsearchEnableIndexingTaskInput>({
                elasticsearchClient: params?.elasticsearchClient,
                documentClient: params?.documentClient,
                response,
                context,
                isAborted,
                isCloseToTimeout,
                store,
                timer
            });

            const indexManager = new IndexManager(
                manager.elasticsearch,
                {},
                {
                    refreshInterval: input.refreshInterval,
                    numberOfReplicas: input.numberOfReplicas
                }
            );

            const enableIndexing = new EnableIndexingTaskRunner(manager, indexManager);

            return enableIndexing.exec(input.matching);
        }
    });
};
