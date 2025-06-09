import {
    createDataSynchronization,
    createElasticsearchReindexingTask,
    createEnableIndexingTask,
    createIndexesTaskDefinition
} from "~/tasks/index.js";
import { type Plugin } from "@webiny/plugins/types.js";
import { type IElasticsearchTaskConfig } from "~/types.js";

export type CreateElasticsearchBackgroundTasksParams = IElasticsearchTaskConfig;

export const createElasticsearchBackgroundTasks = (
    params?: CreateElasticsearchBackgroundTasksParams
): Plugin[] => {
    return [
        createElasticsearchReindexingTask(params),
        createEnableIndexingTask(params),
        createIndexesTaskDefinition(params),
        createDataSynchronization(params)
    ];
};

export * from "~/tasks/createIndexes/CreateElasticsearchIndexTaskPlugin.js";
