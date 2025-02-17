import { createTaskDefinition } from "@webiny/tasks";
import { Context, IElasticsearchTaskConfig } from "~/types.js";
import {
    IDataSynchronizationInput,
    IDataSynchronizationManager,
    IDataSynchronizationOutput
} from "~/tasks/dataSynchronization/types.js";

export const DATA_SYNCHRONIZATION_TASK = "dataSynchronization";

export const createDataSynchronization = (params?: IElasticsearchTaskConfig) => {
    return createTaskDefinition<Context, IDataSynchronizationInput, IDataSynchronizationOutput>({
        id: DATA_SYNCHRONIZATION_TASK,
        isPrivate: false,
        title: "Data Synchronization",
        description: "Synchronize data between Elasticsearch and DynamoDB",
        maxIterations: 100,
        disableDatabaseLogs: true,
        async run({ context, response, isCloseToTimeout, isAborted, store, input, timer }) {
            const { Manager } = await import(
                /* webpackChunkName: "Manager" */
                "../Manager.js"
            );

            const { IndexManager } = await import(
                /* webpackChunkName: "IndexManager" */ "~/settings/index.js"
            );

            const manager = new Manager<IDataSynchronizationInput>({
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

            const { DataSynchronizationTaskRunner } = await import(
                /* webpackChunkName: "DataSynchronizationTaskRunner" */ "./DataSynchronizationTaskRunner.js"
            );

            const { createFactories } = await import(
                /* webpackChunkName: "createFactories" */ "./createFactories.js"
            );

            try {
                const dataSynchronization = new DataSynchronizationTaskRunner({
                    manager: manager as unknown as IDataSynchronizationManager,
                    indexManager,
                    factories: createFactories()
                });
                return await dataSynchronization.run({
                    ...input
                });
            } catch (ex) {
                return response.error(ex);
            }
        },
        createInputValidation({ validator }) {
            return {
                flow: validator.enum(["elasticsearchToDynamoDb"]),
                elasticsearchToDynamoDb: validator
                    .object({
                        finished: validator.boolean().optional().default(false),
                        index: validator.string().optional(),
                        cursor: validator.array(validator.string()).optional()
                    })
                    .optional()
                    .default({
                        finished: false
                    })
            };
        }
    });
};
