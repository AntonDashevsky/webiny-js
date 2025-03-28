import { createTaskDefinition } from "@webiny/tasks";
import { Context, IElasticsearchTaskConfig } from "~/types.js";
import { IElasticsearchCreateIndexesTaskInput } from "~/tasks/createIndexes/types.js";
import { CreateIndexesTaskRunner } from "./CreateIndexesTaskRunner.js";

export const createIndexesTaskDefinition = (params?: IElasticsearchTaskConfig) => {
    return createTaskDefinition<Context, IElasticsearchCreateIndexesTaskInput>({
        id: "elasticsearchCreateIndexes",
        title: "Create Missing Elasticsearch Indexes",
        /**
         * Maximum number of iterations before the task goes into the error state.
         * No point in having more than 2 runs, as the create index operations should not even take 1 full run, no matter how much indeexs is there to create.
         */
        maxIterations: 2,
        run: async ({ response, context, isCloseToTimeout, isAborted, store, input, timer }) => {
            const { Manager } = await import(
                /* webpackChunkName: "Manager" */
                "../Manager.js"
            );
            const { IndexManager } = await import(
                /* webpackChunkName: "IndexManager" */ "~/settings/index.js"
            );

            const manager = new Manager<IElasticsearchCreateIndexesTaskInput>({
                elasticsearchClient: params?.elasticsearchClient,
                documentClient: params?.documentClient,
                response,
                context,
                isAborted,
                isCloseToTimeout,
                store,
                timer
            });

            const indexManager = new IndexManager(manager.elasticsearch, {});

            const createIndexesTaskRunner = new CreateIndexesTaskRunner(manager, indexManager);

            return createIndexesTaskRunner.execute(input.matching, Array.from(input.done || []));
        },
        async onBeforeTrigger({ context }) {
            // Let's create a new index for the tasks first.
            const { IndexManager } = await import(
                /* webpackChunkName: "IndexManager" */ "~/settings"
            );
            const indexManager = new IndexManager(context.elasticsearch, {});
            const { OnBeforeTrigger } = await import(
                /* webpackChunkName: "OnBeforeTrigger" */
                "./OnBeforeTrigger"
            );

            const onBeforeTrigger = new OnBeforeTrigger({
                indexManager,
                context
            });
            await onBeforeTrigger.run(["webinytask"]);
        }
    });
};
