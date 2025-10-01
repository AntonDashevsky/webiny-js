import { createTaskDefinition } from "@webiny/tasks";
import type {
    Context,
    IElasticsearchIndexingTaskValues,
    IElasticsearchTaskConfig
} from "~/types.js";

export const createElasticsearchReindexingTask = (params?: IElasticsearchTaskConfig) => {
    return createTaskDefinition<Context, IElasticsearchIndexingTaskValues>({
        id: "elasticsearchReindexing",
        title: "Elasticsearch reindexing",
        run: async ({ context, isCloseToTimeout, response, input, isAborted, store, timer }) => {
            const { Manager } = await import(
                /* webpackChunkName: "Manager" */
                "../Manager.js"
            );
            const { IndexManager } = await import(
                /* webpackChunkName: "IndexManager" */ "~/settings/index.js"
            );
            const { ReindexingTaskRunner } = await import(
                /* webpackChunkName: "ReindexingTaskRunner" */ "./ReindexingTaskRunner.js"
            );

            const manager = new Manager<IElasticsearchIndexingTaskValues>({
                elasticsearchClient: params?.elasticsearchClient,
                documentClient: params?.documentClient,
                response,
                context,
                isAborted,
                isCloseToTimeout,
                store,
                timer
            });

            const indexManager = new IndexManager(manager.elasticsearch, input.settings || {});
            const reindexing = new ReindexingTaskRunner(manager, indexManager);

            const keys = input.keys || undefined;
            return reindexing.exec(keys, input.limit || 100);
        }
    });
};
